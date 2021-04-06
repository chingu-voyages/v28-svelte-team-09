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
  import { dayjs } from "$utils/deps";
  import { shiftsByUserID } from "$gql/shift";
  // Note: dayjs will auto-convert to local when parsing utc times. You only need to use .utc() when you're writing to the DB.

  let open = false;

  let innerWidth,
    twBreakpoints = [640, 768, 1024, 1280, 1536];
  $: incD =
    (innerWidth && twBreakpoints.findIndex((w) => w > innerWidth) + 1) || 7;

  let d = 0;
  const [handlePrev, handleNext] = [() => (d -= incD), () => (d += incD)];

  $: firstDayOfWeek = dayjs().startOf("day").add(d, "day");
  $: week = Array.from({ length: 7 }, (_, i) => firstDayOfWeek.add(i, "day"));

  let addEmployee = false;
  let isShiftOpen = false;
  let shiftParams = {};

  const employeesOp = employeesByUserID({ id: $authStore.id });
  $: employees = $employeesOp.data?.result.employees.data.slice() ?? [];

  const shiftsOp = shiftsByUserID({ id: $authStore.id });
  $: shifts = $shiftsOp.data?.result.shifts.data.slice() ?? [];

  function datedShifts(shifts, week) {
    let [vacantShifts, employeeShiftsDict] = shifts.reduce(
      (acc, shift) =>
        !shift.assignedTo
          ? acc[0].push(shift) && acc
          : (acc[1][shift.assignedTo._id]
              ? acc[1][shift.assignedTo._id].push(shift)
              : (acc[1][shift.assignedTo._id] = [shift])) && acc,
      [[], {}]
    );

    vacantShifts = weekOfShifts(vacantShifts);
    for (let [k, eShifts] of Object.entries(employeeShiftsDict)) {
      employeeShiftsDict[k] = weekOfShifts(eShifts);
    }

    return [vacantShifts, employeeShiftsDict];

    function weekOfShifts(shiftArr) {
      return week.map(
        (day) =>
          shiftArr.find((shift) => day.isSame(dayjs(shift.start), "day")) || day
      );
    }
  }
  $: [vacantShifts, employeeShiftsDict] = datedShifts(shifts, week);

  function calcMins(shiftArr) {
    return (
      shiftArr.reduce(
        (acc, { start = null, finish, break: breakMins }) =>
          start
            ? acc +
              dayjs(finish).diff(dayjs(start), "minute") -
              (breakMins || 0)
            : acc,
        0
      ) / 60
    );
  }
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
        {incD === 1
          ? week[0].format("DD MMM")
          : week[0].format("DD MMM") + " - " + week[incD - 1].format("DD MMM")}
        <div class="absolute w-64 left-0 top-14 bg-indigo-100">
          <Calendar bind:open bind:firstDayOfWeek bind:d />
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

  {#if employees.length}
    <section
      transition:fade|local
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-[repeat(8,minmax(0,15rem))] gap-[2px] bg-indigo-100 border-b-2 border-t-2 sm:border-t-0"
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
      <ShiftCard
        vacant
        timeRate={((mins = calcMins(vacantShifts)) =>
          mins > 0 ? mins.toFixed(2) + "Hrs" : "")()}
      />
      {#each week as day, i}
        <ShiftItem
          {i}
          shift={vacantShifts[i]}
          on:click={() => {
            let shift = vacantShifts[i];
            if (!shift._id) {
              shiftParams = {
                day,
              };
            } else {
              // prefill saved shift
              shiftParams = {
                day: dayjs(shift.start).startOf("day"),
                shift,
              };
            }
            isShiftOpen = true;
          }}
        />
      {/each}

      <!-- Employees -->
      {#each employees as { name, hourlyWage, _id }, employeeIndex}
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
            shift={employeeShiftsDict[_id]?.[i]}
            on:click={() => {
              shiftParams = {
                employeeIndex,
                day,
                shift: employeeShiftsDict[_id]?.[i],
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
