<script>
  import { authStore } from "$stores/auth";
  import Button from "$lib/Button.svelte";
  import Input from "$lib/Input.svelte";
  import ModalBox from "$lib/ModalBox.svelte";
  import { useCreateEmployee } from "$gql/employee.js";

  export let open = false;
  let clickOutside = true;

  let name,
    email,
    phone,
    hourlyWage,
    address,
    contactName,
    contactPhone;
  
  const [createEmployee, employeeOp] = useCreateEmployee();
  
  //TREAT CREATION ERR IF NECESSARY
  $: if ($employeeOp.error)
    console.log("ERR: error creating employee", $employeeOp.error);

  function handleSubmit() {
    createEmployee({
      name,
      phone,
      email,
      hourlyWage: parseInt(hourlyWage),
      address,
      manager: $authStore.id,
      contactName,
      contactPhone
    });
    open = false;
  }
</script>

<ModalBox bind:open {clickOutside}>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            class="text-2xl font-main leading-6 font-medium mb-6"
            id="modal-headline"
          >
            Add new Person
          </h3>
          <div class="mt-2">
            <div class="[ input-box ] flex justify-between">
              <Input id="name" label="Name" bind:value={name} />
              <Input id="email" label="Email" bind:value={email} />
            </div>
            <div class="[ input-box ] flex justify-between mt-3">
              <Input id="address" label="Address" bind:value={address} />
              <Input id="phone" label="Phone #" bind:value={phone} />
            </div>
            <h3 class="mt-3">Emergency Contacts</h3>
            <div class="[ input-box ] flex justify-between mt-3">
              <Input id="contactName" label="Name" bind:value={contactName} />
              <Input id="contactPhone" label="Phone #" bind:value={contactPhone} />
            </div>
            <div class="[ input-box ] flex justify-between mt-3">
              <Input id="hourlyWage" label="Hourly rate" bind:value={hourlyWage} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-gray-50 px-4 py-3 grid gap-2 sm:px-6 sm:flex sm:flex-row-reverse"
    >
      <Button type="submit">Save</Button>
      <Button type="reset" variant="outline" on:click={() => (open = !open)}
        >Cancel</Button
      >
    </div>
  </form>
</ModalBox>

<style>
  .input-box > :global(div) {
    width: 37%;
  }
  .input-box > :global(div:first-child) {
    width: 60%;
  }
</style>
