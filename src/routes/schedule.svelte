<script>
  import { authStore } from "$stores/auth";
  import Button from "$lib/Button.svelte";
  import { employeesByUserID } from "$gql/employee";
  import AddEmployeeModal from "$lib/schedule/AddEmployeeModal.svelte";
  import AppHeader from "$lib/AppHeader.svelte";
  import ShiftModal from "$lib/schedule/ShiftModal.svelte";
  import ShiftCard from "../lib/schedule/ShiftCard.svelte";
  import ShiftItem from "$lib/schedule/ShiftItem.svelte";
  import Calendar from "$lib/schedule/Calendar.svelte";
  import { fade } from "svelte/transition";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import { shiftsByUserID } from "$gql/shift";
  dayjs.extend(utc);

  let open = false;

  let innerWidth,
    twBreakpoints = [640, 768, 1024, 1280, 1536];
  $: incD =
    (innerWidth && twBreakpoints.findIndex((w) => w > innerWidth) + 1) || 7;
  let d = 0;
  const [handlePrev, handleNext] = [() => (d -= incD), () => (d += incD)];

  $: firstDayOfWeek = dayjs().startOf("week").add(d, "day");
  $: week = Array.from({ length: 7 }, (_, i) => firstDayOfWeek.add(i, "day"));

  let addEmployee = false;
  let isShiftOpen = false;
  let shiftParams = {};

  const employeesOp = employeesByUserID({ id: $authStore.id });
  $: employees = $employeesOp.data?.result.employees.data.slice() ?? [];

  const shiftsOp = shiftsByUserID({ id: $authStore.id });
  $: shifts = $shiftsOp.data?.result.shifts.data.slice() ?? [];
</script>

<svelte:window bind:innerWidth />

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
        on:click={handlePrev}>{"<"}</button
      ><button
        class="bg-indigo-100 px-5 py-2 font-semibold text-lg w-full md:w-auto relative"
        on:click={() => (open = true)}
      >
        {incD === 1 ? week[0].format("DD MMM") : (week[0].format("DD MMM") + ' - ' +  week[incD-1].format("DD MMM"))}
        <div class="absolute w-64 left-0 top-14 bg-indigo-100">
          <Calendar bind:open bind:firstDayOfWeek/>
        </div>
      </button><button
        class="bg-indigo-100 px-8 py-2 rounded-r-md font-semibold text-lg md:px-5"
        on:click={handleNext}>{">"}</button
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
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-[2px] bg-indigo-100 border-b-2 border-t-2 sm:border-t-0"
    >
      <div class="bg-white w-full hidden sm:block" />
      {#each week as day, i}
        <div
          class="bg-white p-2 hidden items-center justify-center"
          class:sm:flex={i < 2}
          class:md:flex={i < 3}
          class:lg:flex={i < 4}
          class:xl:flex={i < 5}
          class:2xl:flex={i >= 5}
        >
          <div
            class="flex flex-col place-items-center place-content-center w-full"
          >
            <h3 class="font-semibold line-clamp-1">{day.format("ddd DD")}</h3>
          </div>
        </div>
      {/each}

      <!-- Open Shifts -->
      <ShiftCard vacant />
      {#each week as day, i}
        <ShiftItem
          {i}
          on:click={() => {
            shiftParams = {
              day,
            };
            isShiftOpen = true;
          }}
        />
      {/each}

      <!-- Employees -->
      {#each employees as { name, hourlyWage }, employeeIndex}
        <ShiftCard
          title={name}
          timeRate={hourlyWage &&
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(hourlyWage)}
        />
        {#each week as day, i}
          <ShiftItem
            {i}
            on:click={() => {
              shiftParams = {
                employeeIndex,
                day,
              };
              isShiftOpen = true;
            }}
          />
        {/each}
      {/each}
    </section>
  {/if}

  <button
    type="button"
    class="rounded flex items-center {employees.length
      ? 'ml-8'
      : 'mx-auto'} mt-8"
    on:click={() => (addEmployee = true)}
  >
    <img
      class="mr-2"
      src="/images/icons/themed-plus-circle-solid.svg"
      width="15"
      alt="add more icon"
    /> Add New Employee
  </button>

  <AddEmployeeModal bind:open={addEmployee} />
  {#key shiftParams}
    <ShiftModal
      {shiftParams}
      employeeOpts={employees}
      bind:open={isShiftOpen}
    />
  {/key}
</main>
