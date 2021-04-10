<script>
  import { authStore } from "$stores/auth";
  import { goto } from "$app/navigation";
  import ModalBox from "$lib/ModalBox.svelte";
  import Button from "$lib/Button.svelte";
  import { dayjs } from "$utils/deps";
  import { useAssignShift } from "$gql/shift";

  export let open = false;
  export let shifts = [];

  $: [_, unpublished] = publishable(shifts);

  let [publishedGroup, unpublishedGroup] = [[], []];
  let linkToCopy = "https://dshift.netlify.app/published/" + $authStore.id;
  let clicked = false;

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
            class="text-lg font-main leading-6 font-semibold mb-4 "
            id="modal-headline"
          >
            Publish Your Schedules
          </h3>
          <h3 class="text-md leading-6 mb-2 font-semibold">Choose shifts to publish</h3>
          <div class="flex flex-col space-y-4 sm:space-y-0 justify-between">
            {#each unpublished as weekShifts}
              <div class="p-0">
                <div class="flex items-center mr-4 mb-2">
                <input type="checkbox" id={weekShifts[0]._id} name="A3-confirmation" value={weekShifts} bind:group={unpublishedGroup} class="opacity-0 absolute h-5 w-5" />
                <div class="bg-white border-2 rounded-md border-indigo-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-indigo-500">
                  <svg class="fill-current hidden w-3 h-3 text-indigo-500 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(-9 -11)" fill="#6366F1" fill-rule="nonzero">
                    <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                    </g>
                  </g>
                  </svg>
                </div>
                <label for={weekShifts[0]._id} class="select-none">
                  Week of
                  {dayjs(weekShifts[0].start).startOf("week").format("MMM DD")} - {dayjs(
                    weekShifts[0].finish
                  ).endOf("week").format("MMM DD")} 
                  [{weekShifts.length} shift{weekShifts.length > 1 ? "s" : ""}]
                </label>
                </div>
              </div>
            {/each}
          </div>
          <Button
            class="mt-3"
            variant="outline"
            on:click={() => {
              goto("/published/" + $authStore.id);
            }}>See published shifts</Button
          >
          <h3 class="text-md leading-6 mt-3 font-semibold">Share link with your employees</h3>
          <Button
            type="button"
            class="mt-3"
            variant="outline"
            on:click={() => {
              navigator.clipboard.writeText(linkToCopy);
              clicked = true;
            }}>{!clicked ? "Copy link" : "Copied!"}</Button
          >  
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

<style>
input:checked + div {
  @apply border-indigo-500;
}
input:checked + div svg {
  @apply block;
}
</style>

