<script>
  import { authStore } from "$stores/auth";
  import { employeesData } from "$stores/employee";
  import Button from "$lib/Button.svelte";
  import { employeesByUserID } from "$gql/employee";
  import AddEmployeeModal from "$lib/schedule/AddEmployeeModal.svelte";
  import AppHeader from "$lib/AppHeader.svelte";
  import ShiftModal from "$lib/schedule/ShiftModal.svelte";
  import ShiftCard from "../lib/schedule/ShiftCard.svelte";
  import ShiftItem from "$lib/schedule/ShiftItem.svelte";
  import { fade } from "svelte/transition";
  import DatePicker from "$lib/calendar/DatePicker.svelte";


  let addEmployee = false;
  let isShiftOpen = false;
  let employees = [];
  let currentDate = new Date();

  const onDateChange = d => {
    currentDate = d.detail;
  };

  let openShifts = [null, null, null, null, null, null, null];

  $: employeeShifts = employees.map((employee) => ({
    employee,
    shifts: [...openShifts],
  }));

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
      >
        <DatePicker
        on:datechange={onDateChange}
        selected={currentDate}
      /><button
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
  {#if employees.length}
    <section
      transition:fade|local
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-[2px] bg-indigo-100 border-b-2 border-t-2"
    >
      <!-- Open Shifts -->
      <ShiftCard open />
      {#each openShifts as shift, i}
        <ShiftItem {i} on:click={() => (isShiftOpen = !isShiftOpen)} />
      {/each}

      <!-- Employees -->
      {#each employees as { name, hourlyWage }}
        <ShiftCard
          title={name}
          timeRate={hourlyWage &&
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(hourlyWage)}
        />
        {#each openShifts as shift, i}
          <ShiftItem {i} on:click={() => (isShiftOpen = !isShiftOpen)} />
        {/each}
      {/each}
    </section>
  {/if}

  <!--TODO:remove button. test button to try the add employee query -->
  <Button class="m-8" on:click={() => (addEmployee = true)}>Add Employee</Button
  >

  <AddEmployeeModal bind:open={addEmployee} />
  <ShiftModal bind:open={isShiftOpen} />
</main>
