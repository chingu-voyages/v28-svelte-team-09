<!-- routify:options preload="proximity" -->
<slot />

<style>
  :global(*) {
    @apply font-main;
    letter-spacing: 1px;
  }
  :global(:not(input[type="text"])) {
    @apply text-indigo-500;
  }
</style>
