<script>
  import "../global.css";
  import { initClient } from "../utils/client";
  // TODO: init client w/ secret
  initClient("secret");
</script>

<slot />
