<script>
  import Button from "$lib/Button.svelte";
  import ModalBox from "$lib/ModalBox.svelte";
  export let data;
  export let open = false;
  let clickOutside = true;
</script>

<ModalBox bind:open {clickOutside}>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="ml-4">
        <div class="mt-3 text-center sm:mt-0 sm:text-left">
          <h3
            class="text-2xl font-main leading-6 font-medium"
            id="modal-headline"
          >
            Personal Details
          </h3>
        </div>
        <h3 class="bg-indigo-100 w-auto font-semibold py-2 text-center text-lg rounded-md px-4 mt-3">
          {data.name}
        </h3>
        <h3
          class="text-xl font-main leading-6 font-medium mt-3"
          id="modal-headline"
        >
          Contact
        </h3>
        <p>{data.phone}</p>
        <p>{data.email}</p>
      </div>
    </div>
    <div
      class="bg-gray-50 px-4 py-3 grid gap-2 sm:px-6 sm:flex sm:flex-row-reverse"
    >
      <Button>Edit</Button>
      <Button type="reset" variant="outline" on:click={() => (open = !open)}
        >Cancel</Button
      >
    </div>
</ModalBox>