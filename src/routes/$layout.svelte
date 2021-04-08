<script>
  import "../global.css";
  import { authStore } from "$stores/auth.js";
  import { initClient } from "$utils/client";
  $: $authStore?.secret && initClient($authStore.secret);
</script>

<div class="min-h-screen flex flex-col">
  <slot />
  <footer class="text-center bg-indigo-500 pt-6 mt-auto">
    <div class="container mx-auto">
      <h2 class="font-logo text-white text-2xl font-medium">DShift</h2>
      <hr class="my-5 mx-28 border-yellow	border-2 rounded-full" />
      <h3 class="text-md pb-4 text-white">
        Built with ❤️ by <a
          class="hover:underline"
          href="https://github.com/chingu-voyages/v28-svelte-team-09"
          >Svelte-Team-09</a
        >
      </h3>
    </div>
  </footer>
</div>
