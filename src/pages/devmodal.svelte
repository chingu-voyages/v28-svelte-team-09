<script>
  import Button from "../components/dev/Button.svelte";
  import Input from "../components/dev/Input.svelte";
  import ModalBox from "../components/ModalBox.svelte";
  let open = true;
</script>

<header class="flex row items-center justify-between px-2">
  <h2 class="justify-self-start hover:bg-blue-100">DShift</h2>
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
            class="text-lg leading-6 font-medium text-gray-900"
            id="modal-headline"
          >
            Add new Employee
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Add as many new people as you want by typing their names and email
              addresses. You can always edit someone's details later, under
              People tab.
            </p>
            <div class="input-box flex justify-between">
              <Input id="name" label="Name*" />
              <Input id="email" label="Email" />
              <Input id="phone" label="Phone #" />
              <!-- <input
                class="border-gray-300 rounded-md border shadow-sm px-4 py-2 mt-3 ml-3 w-36 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo"
                placeholder="Phone # (optional)"
                type="text"
              /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <button
        type="button"
        on:click={() => (open = !open)}
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Cancel
      </button>
      <Button>Save</Button>
      <!-- <button
        type="button"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
      >
        JUST DO IT!
      </button> -->
    </div>
  </ModalBox>
  <Button>Hi hello</Button>
</div>

<style>
  .input-box > :global(div) {
    width: 23%;
  }
  .input-box > :global(div:first-child) {
    width: 50%;
  }
  div :global(button.filled) {
    @apply py-3 sm:py-1 w-full mt-3 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm;
  }
</style>
