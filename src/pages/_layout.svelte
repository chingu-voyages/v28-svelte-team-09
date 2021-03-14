<!-- routify:options preload="proximity" -->
<slot />

<style>
  :global(*:not(input[type="text"])) {
    @apply font-main text-indigo-500;
    letter-spacing: 1px;
  }
</style>
