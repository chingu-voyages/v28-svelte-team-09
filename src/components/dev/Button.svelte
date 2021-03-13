<script>
  export let shadow;
  export let type = "filled";
</script>

<!-- TODO: Add styles for input submit type if needed based on conditions -->
<button
  class="rounded font-semibold py-1 border-main border-1 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500"
  class:filled={type == "filled"}
  class:outline={type == "outline"}
  class:shadow
  on:click><slot /></button
>

<style>
  .outline {
    @apply bg-transparent text-main hover:bg-main-100;
  }
  .filled {
    @apply hover:bg-main-400 hover:border-main-400 bg-main text-white;
  }
  .shadow {
    @apply shadow-md;
  }
</style>
