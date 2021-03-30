<script>
  import { createEventDispatcher } from "svelte";
  import Calender from "$lib/calendar/Calender.svelte";
  import { getMonthName } from "$utils/date-time.js";

  const dispatch = createEventDispatcher();

  // props
  export let selected = new Date();

  // state
  let date, month, year, showDatePicker;

  // so that these change with props
  $: {
    date = selected.getDate();
    month = selected.getMonth();
    year = selected.getFullYear();
  }

  // handlers
  const onFocus = () => {
    showDatePicker = true;
  };

  const next = () => {
    if (month === 11) {
      month = 0;
      year = year + 1;
      return;
    }
    month = month + 1;
  };

  const prev = () => {
    if (month === 0) {
      month = 11;
      year -= 1;
      return;
    }
    month -= 1;
  };

  const onDateChange = d => {
    showDatePicker = false;
    dispatch("datechange", d.detail);
  };
</script>

<div class="relative bg-indigo-100 px-5 py-2 font-semibold text-lg w-full md:w-auto">
  <p class="cursor-pointer" on:click={onFocus}>{selected.toLocaleDateString('en-US')}</p>
  {#if showDatePicker}
    <div class="absolute border-indigo-500 bg-indigo-100 top-12 pb-3 -left-16 sm:left-0 border-2 rounded">
      <div class="flex justify-around py-2 items-center text-white bg-indigo-500">
        <div class="flex justify-center items-center">
          <button class="px-3" on:click={prev}>{"<"}</button>
        </div>
        <div class="flex justify-center items-center">{getMonthName(month)} {year}</div>
        <div class="flex justify-center items-center">
          <button class="px-3" on:click={next}>{">"}</button>
        </div>
      </div>
      <Calender
        {month}
        {year}
        date={selected}
        on:datechange={onDateChange} />
    </div>
  {/if}
</div>
