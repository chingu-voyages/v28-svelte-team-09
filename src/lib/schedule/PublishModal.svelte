<script>
  import { authStore } from "$stores/auth";
  import ModalBox from "$lib/ModalBox.svelte";
  import Button from "$lib/Button.svelte";
  import { dayjs } from "$utils/deps";
  import { useAssignShift } from "$gql/shift";

  export let open = false;
  export let shifts = [];

  const [assignShift, assignShiftOp] = useAssignShift();
  $: $assignShiftOp.error && console.log($assignShiftOp.error);

  async function handleSubmit() {
    return;
    assignShift({
      isPublished: true,
      shiftID: _id,
    });
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
            Publish Your Shifts
          </h3>
          <div
            class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 justify-between"
          >
            <h1>hi</h1>
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
