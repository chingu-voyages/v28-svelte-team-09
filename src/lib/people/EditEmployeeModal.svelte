<script>
  import { authStore } from "$stores/auth";
  import Button from "$lib/Button.svelte";
  import Input from "$lib/Input.svelte";
  import ModalBox from "$lib/ModalBox.svelte";
  import { useUpdateEmployee } from "$gql/employee.js";

  export let open = false;
  export let data;

  let clickOutside = true;

  const [updateEmployee, employeeOp] = useUpdateEmployee();

  //TREAT UPDATE ERR IF NECESSARY
  $: if ($employeeOp.error)
    console.log("ERR: error updating employee", $employeeOp.error);

  function handleSubmit() {
    updateEmployee({
      id: data._id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      hourlyWage: parseInt(data.hourlyWage),
      address: data.address,
      manager: $authStore.id,
      contactName: data.emergencyContact.name,
      contactPhone: data.emergencyContact.phone,
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
            Edit Person
          </h3>
          <div>
            <h3 class="mt-3">Name and Rate</h3>
            <div class="[ input-box ] flex justify-between">
              <Input required id="name" label="Name*" bind:value={data.name} />
              <Input
                id="hourlyWage"
                label="Hourly rate"
                bind:value={data.hourlyWage}
              />
            </div>
            <h3 class="mt-3">Contact Information</h3>
            <div class="[ input-box ] flex justify-between">
              <Input id="email" label="Email" bind:value={data.email} />
              <Input id="phone" label="Phone #" bind:value={data.phone} />
            </div>
            <div class="[ input-box-full ] flex justify-between mt-3">
              <Input id="address" label="Address" bind:value={data.address} />
            </div>
            <h3 class="mt-3">Emergency Contact</h3>
            <div class="[ input-box ] flex justify-between">
              <Input
                id="contactName"
                label="Name"
                bind:value={data.emergencyContact.name}
              />
              <Input
                id="contactPhone"
                label="Phone #"
                bind:value={data.emergencyContact.phone}
              />
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
  .input-box-full > :global(div) {
    width: 100%;
  }
  .input-box > :global(div:first-child) {
    width: 60%;
  }
</style>
