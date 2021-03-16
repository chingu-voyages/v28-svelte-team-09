<script>
  // import RegisterForm from "$lib/RegisterForm.svelte";
  import AuthForm from "$lib/AuthForm.svelte";
  // import { authStore } from "$stores/auth";
</script>

<main>
  <AuthForm />
</main>

<style>
  main {
    display: grid;
    place-items: center;
    min-height: 100vh;
    background: #c8e6f5;
  }
</style>
