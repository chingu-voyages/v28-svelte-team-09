<script>
  export let shadow;
  export let type = "filled";
</script>

<!-- TODO: Add styles for input submit type if needed based on conditions -->
<button
  class="rounded font-semibold py-2 px-4 border border-indigo-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  class:filled={type == "filled"}
  class:outline={type == "outline"}
  class:shadow
  on:click><slot /></button
>

<style>
  .outline {
    @apply bg-transparent text-indigo-500 hover:bg-indigo-300 hover:border-indigo-300 hover:text-white;
  }
  .filled {
    @apply hover:bg-indigo-400 hover:border-indigo-400 bg-indigo-500 text-white;
  }
  .shadow {
    @apply shadow-md;
  }
</style>
