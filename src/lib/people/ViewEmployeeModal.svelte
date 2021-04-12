<script>
  import Button from "$lib/Button.svelte";
  import ModalBox from "$lib/ModalBox.svelte";
  import EditEmployeeModal from "$lib/people/EditEmployeeModal.svelte";
  export let data;
  export let open = false;
  let clickOutside = true;
  let editEmployee = false;
</script>

<ModalBox bind:open {clickOutside}>
  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div class="ml-4">
      <div class="mt-3 text-center sm:mt-0 sm:text-left">
        <h3
          class="text-2xl pr-24 sm:px-0 leading-6 font-medium"
          id="modal-headline"
        >
          Personal Details
        </h3>
      </div>
      <h3 class="bg-indigo-100 w-auto font-semibold py-2 text-center text-lg rounded-md px-4 mt-3">
        {data.name}
      </h3>
      <h3
        class="text-xl leading-6 font-medium mt-3"
      >
        Contact
      </h3>
      <p class="flex my-3">
        <img
          class="mr-2"
          width="15"
          src="/images/icons/themed-mobile-solid.svg"
          alt="mobile icon"
        />{data.phone ? data.phone : 'n/a'}
      </p> 
      <p class="flex my-3">
        <img
          class="mr-2"
          width="15"
          src="/images/icons/themed-envelope-solid.svg"
          alt="envelope icon"
        />{data.email ? data.email : 'n/a'}
      </p>
      <p class="flex my-3">
        <img
          class="mr-2"
          width="15"
          src="/images/icons/themed-map-marker-alt-solid.svg"
          alt="map marker icon"
        />{data.address ? data.address : 'n/a'}
      </p>
      <h3
        class="text-xl leading-6 font-medium mt-3"
      >
        Emergency Contact
      </h3>
      <p class="flex my-3">
        <img
          class="mr-2"
          width="15"
          src="/images/icons/themed-user-solid.svg"
          alt="user icon"
        />{data.emergencyContact.name ? data.emergencyContact.name : 'n/a'}
      </p>
      <p class="flex my-3">
        <img
          class="mr-2"
          width="15"
          src="/images/icons/themed-phone-alt-solid.svg"
          alt="phone icon"
        />{data.emergencyContact.name ? data.emergencyContact.phone : 'n/a'}
      </p>
      <h3
        class="text-xl leading-6 font-medium mt-3"
      >
        Hourly wage
      </h3>
      <p class="flex my-3">
        <img
          class="mr-2"
          width="15"
          src="/images/icons/themed-dollar-sign-solid.svg"
          alt="dollar icon"
        />{data.hourlyWage ? data.hourlyWage : 'n/a'}
      </p>
    </div>
  </div>
  <div
    class="bg-gray-50 px-4 py-3 grid gap-2 sm:px-6 sm:flex sm:flex-row-reverse"
  >
    <Button on:click={() => {editEmployee = true;open = !open}}>Edit</Button>
    <Button type="reset" variant="outline" on:click={() => (open = !open)}
      >Cancel</Button
    >
  </div>
</ModalBox>
<EditEmployeeModal bind:open={editEmployee} {data} />
