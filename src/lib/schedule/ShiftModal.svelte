<script>
  import { authStore } from "$stores/auth";
  import ModalBox from "$lib/ModalBox.svelte";
  import Button from "$lib/Button.svelte";
  import Input from "$lib/Input.svelte";
  import Select from "./Select.svelte";

  export let open = false;
  let clickOutside = true;

  function reset() {
    // employeesToAdd = [newEmployee()];
  }

  async function handleSubmit() {
    open = false;
    reset();
  }
</script>

<ModalBox bind:open {clickOutside}>
  <form
    on:submit|preventDefault={handleSubmit}
    on:reset={() => !(open = false) && reset()}
  >
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            class="text-lg font-main leading-6 font-medium"
            id="modal-headline"
          >
            Shift: Tue 02 Mar
          </h3>
          <div class="mt-2">
            <Select label="Assigned to" class="w-52"
              >Select an employee...</Select
            >
            <Select label="Area" class="w-24"
              ><div
                class="w-4 h-4 rounded-full border border-white"
                style="background: blue"
              /></Select
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-gray-50 px-4 py-3 grid gap-2 sm:px-6 sm:flex sm:flex-row-reverse"
    >
      <Button type="submit">Save</Button>
      <Button type="reset" variant="outline">Cancel</Button>
    </div>
  </form>
</ModalBox>
