<script>
  export let id = "";
  export let label = "";
  export let value = "";

  const labelHandler = (e) => e.target.previousElementSibling.focus();
</script>

<!--@component
@id ID name
@label label name
@value `bind:value` for input value
-->

<div class="relative overflow-hidden">
  <input
    class="input border border-gray-400 shadow-md appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus:border-indigo-500 focus:outline-none active:outline-none active:border-indigo-500"
    bind:value
    class:filled={value}
    {id}
    type="text"
    aria-labelledby="{id}-label"
  />
  <span
    on:click={labelHandler}
    class="label absolute mb-0 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text whitespace-nowrap"
    id="{id}-label"
    >{label}
  </span>
</div>

<style>
  .input {
    transition: border 0.2s ease-in-out;
  }

  .input:focus + .label,
  .input:active + .label,
  .input.filled + .label {
    font-size: 0.75rem;
    transition: all 0.2s ease-out;
    top: -1.4rem;
    color: #6366f1;
  }

  .label {
    transition: all 0.2s ease-out;
    top: -0.5rem;
    left: 0;
  }
</style>
