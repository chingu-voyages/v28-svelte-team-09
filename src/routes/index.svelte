<script>
  import Button from "$lib/Button.svelte";
  import { authStore } from "$stores/auth";

  let open = true;
</script>

<header class="flex row items-center justify-between px-4 lg:px-20 pt-4">
  <h2 class="justify-self-start font-logo text-2xl font-semibold">DShift</h2>
  <nav>
    <a href="/signin">
      <Button>Login</Button>
    </a>
    <a href="/signup">
      <Button type="outline">Register</Button>
    </a>
  </nav>
</header>

{#if $authStore?.secret}
  <div style="display:none;">
    {(location.pathname = "/schedule")}
  </div>
{/if}
