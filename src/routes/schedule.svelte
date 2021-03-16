<script>
  import { authStore } from "$stores/auth";
</script>

<h1>Dshift Home</h1>

<!-- TODO: move logout to app header or user menu -->
<a
  href="/signin"
  on:click={() => {
    localStorage.removeItem("auth");
    $authStore = null;
  }}>Logout</a
>

<style>
  h1 {
    font-size: 50px;
  }
</style>
