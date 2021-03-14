<script>
import AuthForm from "../components/AuthForm.svelte";
</script>


<main>
  <AuthForm login={true}  />
</main>

<style>
  main {
    display: grid;
    place-items: center;
    min-height: 100vh;
    background: #c8e6f5;
  }
</style>
