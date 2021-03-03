<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<Router {routes} />

<style global>
  @import "../assets/global.css";
  /* TODO: Remove this comment. If using Tailwind, remove modern-normalize from assets and below import */
  @import "../assets/modern-normalize.min.css";
</style>
