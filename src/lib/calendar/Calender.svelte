<script>
  import { getDateRows, uuid } from "$utils/date-time.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let date;
  export let month;
  export let year;

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let cells;

  const onChange = date => {
    dispatch("datechange", new Date(year, month, date));
  };

  $: cells = getDateRows(month, year).map(c => ({
    value: c
  }));
</script>

<div class="w-72">
  <div class="flex-wrap justify-center">
    {#each weekdays as day}
      <div class="cell">{day}</div>
    {/each}
  </div>

  <div class="flex-wrap justify-center items-center">
    {#each cells as { value } (uuid())}
      <div
        on:click={onChange.bind(this, value)}
        class:cell={true}
        class:highlight={value}
        class:selected={new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() === new Date(year, month, value).getTime()}>
        {value || ''}
      </div>
    {/each}
  </div>
</div>

<style>
  .cell {
    display: inline-block;
    width: 36px;
    height: 20px;
    text-align: center;
    padding: 4px;
    margin: 1px;
  }
  .selected {
    color: #fff;
  }
  .highlight:hover {
    color: #fff;
    cursor: pointer;
    transform: scale(1.6);
  }
</style>