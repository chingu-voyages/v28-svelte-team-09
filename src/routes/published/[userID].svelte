<script>
  import { page } from '$app/stores';
  import { initClient } from "$utils/client";
  import { employeesByUserID } from "$gql/employee";
  import ShiftCard from "../../lib/schedule/ShiftCard.svelte";
  import ShiftItem from "$lib/schedule/ShiftItem.svelte";
  import Calendar from "$lib/schedule/Calendar.svelte";
  import { fade } from "svelte/transition";
  import { dayjs } from "$utils/deps";
  import { shiftsByUserID } from "$gql/shift";

  let publicFaunaKey = "fnAEGUIErDACCZYPP6oqP-yAdZviRHV8C_p9EEmd"
  initClient(publicFaunaKey);

  let open = false;

  let innerWidth,
    twBreakpoints = [640, 768, 1024, 1280, 1536];
  $: incD =
    (innerWidth && twBreakpoints.findIndex((w) => w > innerWidth) + 1) || 7;

  let d = 0;
  const [handlePrev, handleNext] = [() => (d -= incD), () => (d += incD)];

  $: firstDayOfWeek = dayjs().startOf("day").add(d, "day");
  $: week = Array.from({ length: 7 }, (_, i) => firstDayOfWeek.add(i, "day"));

  const employeesOp = employeesByUserID({ id: $page.params.userID });
  $: companyName = $employeesOp.data?.result.companyName ?? "Loading...";
  $: employees = $employeesOp.data?.result.employees.data.slice() ?? [];

  const shiftsOp = shiftsByUserID({ id: $page.params.userID });
  $: shifts = $shiftsOp.data?.result.shifts.data.slice() ?? [];
  $: shifts = shifts.filter(s => s.isPublished)

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
  $: [_, employeeShiftsDict] = datedShifts(shifts, week);
 

  function calcMins(shiftArr) {
    return shiftArr.reduce(
      (acc, { start = null, finish, break: breakMins }) =>
        start
          ? acc + dayjs(finish).diff(dayjs(start), "minute") - (breakMins || 0)
          : acc,
      0
    );
  }
 
</script>

<svelte:window bind:innerWidth />

<main class="text-center bg-white">
  <section
    class="m-3 flex flex-col items-center space-y-2 md:grid md:space-y-0 md:grid-cols-3 md:justify-items-start"
  >
    <h3
      class="bg-indigo-100 w-11/12 font-semibold p-2 text-lg rounded-md md:px-8 md:whitespace-nowrap md:w-auto"
    >
      {companyName}
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

      {#each employees as { name, hourlyWage, _id }, employeeIndex}
        <ShiftCard
          title={name}
          timeRate={(() => {
            if (employeeShiftsDict[_id]) {
              let hrs = calcMins(employeeShiftsDict[_id]) / 60;
              let formattedHrs = hrs.toFixed(2) + "Hrs";
              return hrs <= 0
                ? ""
                : hourlyWage
                ? `${formattedHrs}`
                : formattedHrs;
            } else return "";
          })()}
        />
        {#each week as day, i}
          <ShiftItem
            {i}
            {day}
            employeeID={_id}
            shift={employeeShiftsDict[_id]?.[i]}
            onPublished={true}
          />
        {/each}
      {/each}
    </section>
  {/if}
</main>
