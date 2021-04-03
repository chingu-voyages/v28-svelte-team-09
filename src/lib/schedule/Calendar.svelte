<script>
  import { dayjs } from "$utils/deps";
  import { clickOutside as clickOutsideAction } from "$utils/actions";
  import { fade } from "svelte/transition";

  export let open = false;
  export let firstDayOfWeek;

  const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  let outReady = false;
  $: open ? setTimeout(() => (outReady = true)) : (outReady = false);

  let m = 0;
  function handlePrev() {
    return (m -= 1);
  }
  function handleNext() {
    return (m += 1);
  }

  $: month = dayjs().add(m, "months");
  $: getNumberOfDaysInMonth = dayjs(month).daysInMonth();
  $: firstDayOfTheMonthWeekday = dayjs(currentMonthDays[0].date).day();
  $: lastDayOfTheMonthWeekday = dayjs(
    currentMonthDays[currentMonthDays.length - 1].date
  ).day();

  $: currentMonthDays = new Array(getNumberOfDaysInMonth)
    .fill(dayjs(month).startOf("month"))
    .map((day, i) => {
      return {
        date: day.add(i, "day"),
        dayOfMonth: i + 1,
      };
    });

  $: prevMonthDays = new Array(firstDayOfTheMonthWeekday)
    .fill(dayjs(month.subtract("1", "month")).endOf("month"))
    .map((day, i) => {
      return {
        dayOfMonth: day
          .add(i + 1 - firstDayOfTheMonthWeekday, "day")
          .format("DD"),
      };
    });

  $: nextMonthDays = new Array(6 - lastDayOfTheMonthWeekday)
    .fill(dayjs(month.add("1", "month")).startOf("month"))
    .map((_, i) => {
      return {
        dayOfMonth: i + 1,
      };
    });
</script>

{#if open}
  <div
    class="z-10 px-2 py-2 w-auto text-base cursor-default"
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 200 }}
    use:clickOutsideAction={{
      enabled: true,
      cb: () => outReady && (open = false),
    }}
  >
    <div
      class="flex justify-between items-center z-10 px-2 py-2 w-auto text-base"
    >
      <button
        class="p-3 font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0"
        on:click={handlePrev}
        >{"<"}
      </button>
      {month.format("MMMM YYYY")}
      <button
        class="p-3 font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0"
        on:click={handleNext}
        >{">"}
      </button>
    </div>
    <div class="grid grid-cols-7">
      {#each WEEKDAYS as day}
        <p class="text-red-500">{day}</p>
      {/each}
      {#each prevMonthDays as day}
        <p class="text-gray-400">{day.dayOfMonth}</p>
      {/each}
      {#each currentMonthDays as day}
        <p on:click={() => (firstDayOfWeek = day.date)} class="cursor-pointer">
          {day.dayOfMonth}
        </p>
      {/each}
      {#each nextMonthDays as day}
        <p class="text-gray-400">{day.dayOfMonth}</p>
      {/each}
    </div>
    <p class="mt-2 cursor-pointer" on:click={() => (firstDayOfWeek = dayjs())}>
      Return to current date
    </p>
  </div>
{/if}
