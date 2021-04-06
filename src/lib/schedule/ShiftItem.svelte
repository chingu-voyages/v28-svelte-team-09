<script>
  import dayjs from "dayjs";

  export let i;
  export let shift = {};
  $: ({
    area = null,
    assignedTo = null,
    start = null,
    finish = null,
    _id = null,
  } = shift || {});
</script>

<div
  class="bg-white p-2 {i != 0 && 'hidden'}  items-center justify-center"
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
      : "font-semibold text-white rounded-lg focus:transition-colors h-full min-w-full sm:min-w-1/2 bg-indigo-500 space-y-2"}
    on:click
  >
    {#if !_id}
      <img
        src="/images/icons/themed-plus-solid.svg"
        width="40"
        height="40"
        alt="plus icon"
      />
    {:else}
      <span
        >{dayjs(start).format("hh:mma")} - {dayjs(finish).format(
          "hh:mma"
        )}</span
      >
      <div>
        <span
          class="font-medium rounded-2xl px-4 py-1 truncate text-white"
          style="background: {area?.color}"
          >{area?.name}</span
        >
        {#if !assignedTo}
          <span
            class="font-semibold text-white bg-yellow-600 rounded-md py-1 px-3"
            >Open</span
          >
        {/if}
      </div>
    {/if}</button
  >
</div>