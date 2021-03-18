<script>
  import Button from "$lib/Button.svelte";
  import ModalBox from "$lib/ModalBox.svelte";
  import AuthForm from "$lib/AuthForm.svelte";
  import { authStore } from "$stores/auth";
</script>

<header class="flex row items-center justify-between px-4 lg:px-20 pt-4">
  <h2 class="justify-self-start font-logo text-2xl font-semibold">DShift</h2>
  <nav>
      <Button>Login</Button>
      <Button type="outline">Register</Button>
  </nav>
</header>

<main>
  <ModalBox clickOutside={true} open={true}>
    <AuthForm login={true} />
  </ModalBox>
</main>

{#if $authStore?.secret}
  <div style="display:none;">
    {(location.pathname = "/schedule")}
  </div>
{/if}
