<script>
  import Button from "$lib/Button.svelte";
  import Input from "$lib/Input.svelte";
  import { authStore } from "$stores/auth";
  let value = "";
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
{:else}
  <section>
    <div>Welcome to DSHIFT</div>
    <a href="/signin" target="_self" class="link">Sign in</a>
    <a href="/signup" target="_self" class="link">Sign up</a>
  </section>
  <Input id="example" label="Some input" bind:value />
{/if}
