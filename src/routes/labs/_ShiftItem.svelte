<script>
  import { useAssignShift } from "$gql/shift";
  import { dayjs } from "$utils/deps";
  import {
    dndzone,
    overrideItemIdKeyNameBeforeInitialisingDndZones,
  } from "svelte-dnd-action";
  overrideItemIdKeyNameBeforeInitialisingDndZones("_id");

  export let i,
    day = null,
    employeeID = null,
    shift = {},
    onPublished = false;
  $: ({
    area = null,
    assignedTo = null,
    start = null,
    finish = null,
    _id = null,
    isPublished = null,
  } = shift || {});

  const cols = [
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
    "col-start-8",
  ];

  const [assignShift, assignShiftOp] = useAssignShift();
  $: $assignShiftOp.error && console.log($assignShiftOp.error);

  $: items = [_id ? shift : { _id: employeeID, day }];
  var dragItem, dropZone;
  function consider(e) {
    if (
      e.detail.info.trigger == "draggedEntered" &&
      e.detail.items.length == 2
    ) {
      if (e.detail.items[0]?.start) [dragItem, dropZone] = e.detail.items;
      else [dropZone, dragItem] = e.detail.items;
    }
  }
  async function finalize({ detail }) {
    if (detail.info && dragItem && dropZone) {
      const shift = dragItem;
      const start = dayjs(shift.start)
        .set("date", dropZone.day.get("date"))
        .utc()
        .format();

      let upShift = { shiftID: shift._id };
      const diff = dayjs(shift.finish).diff(dayjs(shift.start), "minutes") || 0;
      const finish = dayjs(start).add(diff, "minutes").utc().format();
      if (!dayjs(start).isSame(dayjs(shift.start), "date")) {
        upShift.start = start;
        upShift.finish = finish;
      }
      upShift.assignedTo = dropZone._id ? dropZone._id : { disconnect: true };

      await assignShift(upShift);
    }
  }
</script>

<div
  use:dndzone={{
    items,
    dragDisabled: !_id,
    dropFromOthersDisabled: _id,
  }}
  on:consider={consider}
  on:finalize={finalize}
  class="bg-white p-2 {i != 0 && 'hidden'} items-center justify-center {cols[
    i
  ]}"
  class:flex={i == 0}
  class:hidden={i != 0}
  class:sm:flex={i < 2}
  class:md:flex={i < 3}
  class:lg:flex={i < 4}
  class:xl:flex={i < 5}
  class:2xl:flex={i >= 5}
>
  <button
    class={!_id
      ? "rounded-sm focus:transition-colors px-1 w-full h-full grid place-items-center"
      : `font-semibold text-white rounded-lg focus:transition-colors h-full w-full sm:min-w-1/2 ${
          !isPublished ? "bg-indigo-500" : "bg-gray-400"
        } space-y-2 space-y-2`}
    on:click
  >
    {#if !_id}
      {#if !onPublished}
        <img
          src="/images/icons/themed-plus-solid.svg"
          width="40"
          height="40"
          alt="plus icon"
        />
      {/if}
    {:else}
      <span
        >{dayjs(start).format("hh:mma")} - {dayjs(finish).format(
          "hh:mma"
        )}</span
      >
      <div>
        <span
          class="font-medium rounded-2xl px-4 py-1 truncate text-white"
          style="background: {area?.color}">{area?.name}</span
        >
        {#if !assignedTo}
          <span
            class="font-semibold text-white bg-yellow-600 rounded-md py-1 px-3"
            >Open</span
          >
        {/if}
      </div>
    {/if}
  </button>
</div>
