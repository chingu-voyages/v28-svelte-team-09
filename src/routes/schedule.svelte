<script>
  import { authStore } from "$stores/auth";
  import { employeesData } from "$stores/employee";
  import Button from "$lib/Button.svelte";
  import { employeesByUserID } from "$gql/employee";
  import AddEmployeeModal from "$lib/schedule/AddEmployeeModal.svelte";
  import AppHeader from "$lib/AppHeader.svelte";

  let addEmployee = false;

  //fetch employee data from DB
  const employeesOp = employeesByUserID({ id: $authStore.id });
  $: if ($employeesOp.data?.result != null) {
    $employeesData = [...$employeesOp.data.result.employees.data];
    console.log("fetched", $employeesData);
  }
</script>

<AppHeader />

<main class="text-center bg-white">
  <section
    class="m-3 flex flex-col items-center space-y-2 md:grid md:space-y-0 md:grid-cols-3 md:justify-items-start"
  >
    <h3
      class="bg-indigo-100 w-11/12 font-semibold p-2 text-lg rounded-md md:px-8 md:whitespace-nowrap md:w-auto"
    >
      <!-- TODO: {companyName} -->
      Nemesis Coffee
    </h3>
    <!-- TODO: Styles and date picker (?) -->
    <div class="space-x-2 w-11/12 md:w-auto flex m-auto">
      <button
        class="bg-indigo-100 px-8 py-2 rounded-l-md font-semibold text-lg md:px-5"
        >{"<"}</button
      ><button
        class="bg-indigo-100 px-5 py-2 font-semibold text-lg w-full md:w-auto"
      >
        <!-- TODO: {curDay} -->
        01 Mar</button
      ><button
        class="bg-indigo-100 px-8 py-2 rounded-r-md font-semibold text-lg md:px-5"
        >{">"}</button
      >
    </div>
    <Button className="publish-btn"
      >Publish Shifts
      <!-- TODO: {numShifts}, disabled styles & state -->
    </Button>
  </section>

  <!-- TODO: Desktop grid & each block + shift display -->
  <section
    class="grid grid-cols-2 gap-[2px] bg-indigo-100 border-b-2 border-t-2"
  >
    <div class="flex space-x-5 justify-center items-center bg-white p-4">
      <img
        class="rounded-full shadow-md"
        src="/images/icons/themed-user-circle-solid.svg"
        width="55"
        alt="default user"
      />
      <div>
        <h3 class="font-semibold">Open/Empty Shifts</h3>
        <!-- TODO: {openTime}Hrs-->
        <p class="text-indigo-100">7.00Hrs</p>
      </div>
    </div>
    <div class="bg-white p-2 flex items-center justify-center">
      <button class="rounded-sm focus:transition-colors px-1"
        ><img
          src="/images/icons/themed-plus-solid.svg"
          width="40"
          height="40"
          alt="plus icon"
        /></button
      >
    </div>
  </section>

  <!--TODO:remove button. test button to try the add employee query -->
  <Button on:click={() => (addEmployee = true)}>Add Employee</Button>
  <AddEmployeeModal bind:open={addEmployee} />
  <div><h1 class="my-44">Spacer</h1></div>
</main>

<style>
  section :global(.publish-btn) {
    @apply w-11/12 md:ml-auto md:w-auto;
  }
</style>
