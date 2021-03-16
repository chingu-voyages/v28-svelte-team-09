<script>
  import "../global.css";
  import { initClient } from "../utils/client";
  // TODO: init client w/ secret
  console.log(initClient("secret"));
</script>

<slot />
