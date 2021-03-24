<script>
  import "../global.css";
  import { authStore } from "$stores/auth.js";
  import { initClient } from "$utils/client";
  $: $authStore?.secret && initClient($authStore.secret);
</script>

<slot />

<footer class="text-center bg-indigo-500">
  <div class="container mx-auto">
    <h2 class="font-logo text-white text-2xl font-medium">DShift</h2>
    <hr class="my-5 mx-28 border-yellow	border-2 rounded-full" />
    <h3 class="text-md pb-4 text-white">
      © DShift, Inc. 2021. Built with ❤️ by Svelte-Team-09
    </h3>
  </div>
</footer>
