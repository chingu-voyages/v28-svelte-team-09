<script>
  import { authStore } from "$stores/auth";
  import Button from "$lib/dev/Button.svelte";

</script>

<header class="flex row items-center justify-between px-4 mt-2 lg:px-20">
  <h2 class="justify-self-start text-3xl font-logo">DShift</h2>
  <nav>
    <Button>
      <a href="/signin" on:click={() => {localStorage.removeItem("auth"); $authStore = null;}}>
      Logout</a>
    </Button>
  </nav>
</header>