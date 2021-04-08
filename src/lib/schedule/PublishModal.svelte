<script>
  import { authStore } from "$stores/auth";
  import ModalBox from "$lib/ModalBox.svelte";
  import Button from "$lib/Button.svelte";
  import { dayjs } from "$utils/deps";
  import { useAssignShift } from "$gql/shift";

  export let open = false;
  export let shifts = [];

  $: [published, unpublished] = publishable(shifts);

  let [publishedGroup, unpublishedGroup] = [[], []];

  function publishable(shifts) {
    let [published, unpublished] = shifts
      .reduce(
        (acc, shift) =>
          !shift.assignedTo || dayjs().isAfter(dayjs(shift.finish))
            ? acc
            : shift.isPublished
            ? acc[0].push(shift) && acc
            : acc[1].push(shift) && acc,
        [[], []]
      )
      .map((shifts) =>
        shifts
          .sort((a, b) => dayjs(a.finish).unix() - dayjs(b.finish).unix())
          .reduce((acc, shift) => {
            let lastItem =
              acc[acc.length - 1]?.[acc[acc.length - 1].length - 1];
            if (acc[0] && dayjs(lastItem.start).isSame(shift.start, "week")) {
              acc[acc.length - 1].push(shift);
            } else {
              acc.push([shift]);
            }
            return acc;
          }, [])
      );
    return [published, unpublished];
  }

  const [assignShift, assignShiftOp] = useAssignShift();
  $: $assignShiftOp.error && console.log($assignShiftOp.error);

  async function handleSubmit() {
    const selectedPublishIds = [...publishedGroup, ...unpublishedGroup].reduce(
      (acc, arr) => {
        arr.forEach(({ _id }) => acc.push(_id));
        return acc;
      },
      []
    );

    open = false;
    await Promise.allSettled(
      selectedPublishIds.map((id) =>
        assignShift({
          isPublished: true,
          shiftID: id,
        })
      )
    );
  }
</script>

<ModalBox bind:open clickOutside>
  <form on:submit|preventDefault={handleSubmit} on:reset={() => (open = false)}>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            class="text-lg font-main leading-6 font-medium mb-4"
            id="modal-headline"
          >
            Publish Your Schedules
          </h3>
          <h3 class="text-md leading-6 mb-4">Unpublished</h3>
          <div class="flex flex-col space-y-4 sm:space-y-0 justify-between">
            {#each unpublished as weekShifts}
              <label for={weekShifts[0]._id}>
                <input
                  type="checkbox"
                  id={weekShifts[0]._id}
                  value={weekShifts}
                  bind:group={unpublishedGroup}
                />
                [{weekShifts.length} shift{weekShifts.length > 1 ? "s" : ""}]
                Week of
                {dayjs(weekShifts[0].start).startOf("week").format("MMM DD")} - {dayjs(
                  weekShifts[0].finish
                )
                  .endOf("week")
                  .format("MMM DD")}
              </label>
            {/each}
          </div>
          <h3 class="text-md leading-6 mb-4">Published</h3>
          <div class="flex flex-col space-y-4 sm:space-y-0 justify-between">
            {#each published as weekShifts}
              <label for={weekShifts[0]._id}>
                <input
                  type="checkbox"
                  id={weekShifts[0]._id}
                  value={weekShifts}
                  bind:group={publishedGroup}
                />
                [{weekShifts.length} shift{weekShifts.length > 1 ? "s" : ""}]
                Week of
                {dayjs(weekShifts[0].start).startOf("week").format("MMM DD")} - {dayjs(
                  weekShifts[0].finish
                )
                  .endOf("week")
                  .format("MMM DD")}
              </label>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-gray-50 px-4 py-3 grid gap-2 sm:px-6 sm:flex sm:flex-row-reverse"
    >
      <Button type="submit">Publish</Button>
      <Button type="reset" variant="outline">Cancel</Button>
    </div>
  </form>
</ModalBox>
