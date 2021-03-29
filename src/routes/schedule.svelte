<script>
  import { authStore } from "$stores/auth";
  import { employeesData } from "$stores/employee";
  import Button from "$lib/Button.svelte";
  import { employeesByUserID } from "$gql/employee";
  import AddEmployeeModal from "$lib/schedule/AddEmployeeModal.svelte";
  import AppHeader from "$lib/AppHeader.svelte";
  import ShiftModal from "$lib/schedule/ShiftModal.svelte";

  let addEmployee = false;
  let shiftOpen = false;
  let employees = [];

  //fetch employee data from DB
  const employeesOp = employeesByUserID({ id: $authStore.id });
  $: if ($employeesOp.data?.result != null) {
    employees = [...$employeesOp.data.result.employees.data];
    $employeesData = [...employees];
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
    <Button class="w-11/12 md:ml-auto md:w-auto"
      >Publish Shifts
      <!-- TODO: {numShifts}, disabled styles & state -->
    </Button>
  </section>

  <!-- TODO: Desktop grid & each block + shift display -->
  <section
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-[2px] bg-indigo-100 border-b-2 border-t-2"
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
    {#each [0, 1, 2, 3, 4, 5, 6] as _, i}
      <div
        class="bg-white p-2 {i != 0 && 'hidden'} {i == 0
          ? 'flex'
          : i < 2
          ? 'sm:flex'
          : i < 3
          ? 'md:flex'
          : i < 4
          ? 'lg:flex'
          : i < 5
          ? 'xl:flex'
          : '2xl:flex'} items-center justify-center"
      >
        <button
          class="rounded-sm focus:transition-colors px-1"
          on:click={() => (shiftOpen = !shiftOpen)}
          ><img
            src="/images/icons/themed-plus-solid.svg"
            width="40"
            height="40"
            alt="plus icon"
          /></button
        >
      </div>
    {/each}
    <!-- demo for added shift -->
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
      <button
        class="font-semibold text-white rounded-lg focus:transition-colors h-full min-w-full sm:min-w-1/2 bg-indigo-500"
        on:click={() => (shiftOpen = !shiftOpen)}
      >
        <span> 9am - 4:30pm </span>
        <div>
          <span
            class="font-semibold text-indigo-500 bg-yellow-300 rounded-2xl px-4 py-1 truncate"
            >Kitchen</span
          >
          <span
            class="font-semibold text-white bg-yellow-600 rounded-md py-1 px-3"
            >Open</span
          >
        </div>
      </button>
    </div>
  </section>

  <!--TODO:remove button. test button to try the add employee query -->
  <Button on:click={() => (addEmployee = true)}>Add Employee</Button>

  <AddEmployeeModal bind:open={addEmployee} />
  <ShiftModal bind:open={shiftOpen} />
  <div><h1 class="my-44">Spacer</h1></div>
</main>
