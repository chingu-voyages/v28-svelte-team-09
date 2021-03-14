<!-- routify:options preload="proximity" -->
<slot />

<style>
  :global(*) {
    @apply font-main text-indigo-500;
    letter-spacing: 1px;
  }
  :global(input[type="text"]) {
    @apply text-black;
  }
</style>
