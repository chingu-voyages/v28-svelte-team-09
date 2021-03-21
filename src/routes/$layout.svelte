<script>
  import "../global.css";
  import { authStore } from "$stores/auth.js"
  import { initClient } from "$utils/client";
  // TODO: init client w/ secret
  $: $authStore.secret && initClient($authStore.secret)
</script>

<slot />
