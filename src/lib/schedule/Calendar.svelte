<script>
  import dayjs from "dayjs";
  import { clickOutside as clickOutsideAction } from "$utils/actions";
  import { fade } from "svelte/transition";

  export let open = false;

  let outReady = false;
  $: open ? setTimeout(() => (outReady = true)) : (outReady = false);
  
  let m = 0;
  const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  function handlePrev() {
		return m -= 1;
	};
  function handleNext() {
		return m += 1;
	};

  $: month = dayjs().add(m, 'months');
  $: getNumberOfDaysInMonth = dayjs(month).daysInMonth();
  $: firstDayOfTheMonthWeekday = dayjs(currentMonthDays[0].date).day();

  $: currentMonthDays = new Array(getNumberOfDaysInMonth).fill(dayjs(month).startOf("month"))
    .map((day, i) => {
      return {
      date: day.add(i, "day"),
      dayOfMonth: day.add(i, "day").format('DD'),
      isCurrentMonth: true
      };
    });

  $: prevMonthDays = new Array(firstDayOfTheMonthWeekday).fill(dayjs(month.subtract('1', 'month')).endOf("month"))
    .map((day, i) => {
      return {
      date: day.add(i, "day"),
      dayOfMonth: day.add(i, "day").format('DD')-i,
      isCurrentMonth: true
      };
    });

    $: console.log(prevMonthDays);

  $: nextMonthDays = new Array(getNumberOfDaysInMonth).fill(dayjs(month).startOf("month"))
    .map((day, i) => {
      return {
      date: day.add(i, "day"),
      dayOfMonth: i + 1,
      isCurrentMonth: true
      };
    });

  $: days = [...prevMonthDays, ...currentMonthDays]; 
  



</script>

{#if open}
  <div class="z-10 px-2 py-2 w-auto text-base"
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 200 }}
    use:clickOutsideAction={{
          enabled: true,
          cb: () => outReady && (open = false),
        }}
  >
  <div class="flex justify-between items-center z-10 px-2 py-2 w-auto text-base">
  <button
        class="p-3 font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0" 
        on:click={handlePrev}
        >{"<"}</button>

        {month.format('MMMM YYYY')}
        <button
        class="p-3 font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0"
        on:click={handleNext}
        >{">"}</button
      >
      </div>

      <div class="grid grid-cols-7">
        {#each WEEKDAYS as day}
          <p class="text-red-500">{day}</p>
        {/each}
        {#each days as day}
          <p>{day.dayOfMonth}</p>
        {/each}
      </div>
  </div>
{/if}