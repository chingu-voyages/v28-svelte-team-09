<script>
  import Button from "../components/dev/Button.svelte";
  import Input from "../components/dev/Input.svelte";
  import ModalBox from "../components/ModalBox.svelte";
  let open = true;
</script>

<header class="flex row items-center justify-between px-4 lg:px-20">
  <h2 class="justify-self-start font-logo">DShift</h2>
  <nav>
    <Button>Login</Button>
    <Button type="outline">Register</Button>
  </nav>
</header>

<div class="h-screen grid place-content-center">
  <ModalBox {open}>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            class="text-lg font-main leading-6 font-medium "
            id="modal-headline"
          >
            Add new Employee
          </h3>
          <div class="mt-2">
            <p class="text-sm font-main text-indigo-400">
              Add as many new people as you want by typing their names and email
              addresses. You can always edit someone's details later, under
              People tab.
            </p>
            <div class="input-box flex justify-between">
              <Input id="name" label="Name*" />
              <Input id="email" label="Email" />
              <Input id="phone" label="Phone #" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-gray-50 px-4 py-3 grid gap-2 sm:px-6 sm:flex sm:flex-row-reverse"
    >
      <Button>Save</Button>
      <Button type="outline" on:click={() => (open = !open)}>Cancel</Button>
      <!-- <button
        class="mx-2 bg-transparent shadow cursor-pointer hover:bg-indigo-500 focus:outline-none text-indigo-500 focus:border-indigo-500 font-main font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
        type="button"
        on:click={() => (open = !open)}
      >
        Cancel
      </button> -->
    </div>
  </ModalBox>
  <Button>Hi Hello!</Button>
</div>

<style>
  .input-box > :global(div) {
    width: 23%;
  }
  .input-box > :global(div:first-child) {
    width: 50%;
  }
</style>
