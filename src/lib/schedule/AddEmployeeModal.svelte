<script>
  import { authStore } from "$stores/auth";
  import Button from "$lib/Button.svelte";
  import Input from "$lib/Input.svelte";
  import ModalBox from "$lib/ModalBox.svelte";
  import { useCreateEmployee } from "$gql/employee.js";
  import { slide } from "svelte/transition";

  export let open = false;
  let clickOutside = true;

  const [createEmployee, employeeOp] = useCreateEmployee();
  let employeesToAdd = [newEmployee()];

  $: clickFix = employeesToAdd.length;
  $: clickFix && // fix: clickOutside bug when removing an employee
    !(clickOutside = false) &&
    setTimeout(() => (clickOutside = true));

  //TREAT CREATION ERR IF NECESSARY
  $: if ($employeeOp.error)
    console.log("ERR: error creating employee", $employeeOp.error);

  function newEmployee() {
    return {
      name: "",
      email: "",
      phone: "",
    };
  }

  function reset() {
    employeesToAdd = [newEmployee()];
  }

  async function handleSubmit() {
    let promises = [];
    for (let employee of employeesToAdd)
      promises.push(
        createEmployee({ ...employee, hourlyWage: 15, manager: $authStore.id })
      );
    await Promise.allSettled(promises);
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
            Add new Employee
          </h3>
          <div class="mt-2">
            <p class="text-sm font-main text-indigo-400 mb-6">
              Add as many new people as you want by typing their names and email
              addresses. You can always edit someone's details later, under
              People tab.
            </p>

            {#each employeesToAdd as { name, email, phone }, i (employeesToAdd[i])}
              <div
                transition:slide
                class="[ input-box ] flex justify-between items-center mb-4"
              >
                <Input required id="name" label="Name*" bind:value={name} />
                <Input id="email" label="Email" bind:value={email} />
                <Input id="phone" label="Phone #" bind:value={phone} />
                <button
                  type="button"
                  class="h-4 focus:ring-red-500 rounded"
                  on:click={() =>
                    employeesToAdd.length > 1
                      ? (employeesToAdd = employeesToAdd.splice(i, 1) && [
                          ...employeesToAdd,
                        ])
                      : employeesToAdd[0].name && reset()}
                >
                  <img
                    width="15"
                    src="/images/icons/themed-trash-alt-solid.svg"
                    alt="trash icon"
                  />
                </button>
              </div>
            {/each}

            <button
              type="button"
              class="rounded flex items-center"
              on:click={() =>
                (employeesToAdd = [...employeesToAdd, newEmployee()])}
            >
              <img
                class="mr-2"
                src="/images/icons/themed-plus-circle-solid.svg"
                width="15"
                alt="add more icon"
              /> Add more
            </button>
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

<style>
  .input-box > :global(div) {
    max-width: 30%;
  }
</style>
