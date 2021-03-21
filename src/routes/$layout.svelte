<script>
  import "../global.css";
  import { authStore } from "$stores/auth.js"
  import { initClient } from "$utils/client";
  $: $authStore.secret && initClient($authStore.secret)
</script>

<slot />
