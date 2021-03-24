<script>
  export let variant = "filled",
    shadow = false,
    type = false,
    className = "styled-btn";
</script>

<!--@component
@variant `="outline"` for variant
@shadow box-shadow
-->

<!-- TODO: Add styles for input submit type if needed based on conditions -->
<button
  class="[ {className} ] rounded font-semibold py-2 px-4 border border-indigo-500"
  {type}
  class:filled={variant == "filled"}
  class:outline={variant == "outline"}
  class:shadow-md={shadow}
  on:click><slot /></button
>

<style>
  .outline {
    @apply bg-transparent hover:bg-indigo-50;
  }
  .filled {
    @apply hover:bg-indigo-400 hover:border-indigo-400 bg-indigo-500 text-white;
  }
</style>
