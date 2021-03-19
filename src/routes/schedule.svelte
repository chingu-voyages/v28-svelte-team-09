<script>
  import { authStore } from "$stores/auth";
  import Button from "$lib/Button.svelte";
  // import { employeesByUserID } from "$gql/employee"
    let src = "/images/1.png";
</script>

<header class="flex row items-center justify-between px-4 lg:px-20 my-1">
  <div class="flex items-center">
    <img {src} alt="DShift logo" class="h-16" />
    <h2 class="justify-self-start font-logo text-2xl font-medium">DShift</h2>
  </div>
  <nav>
    <Button>
      <a
        href="/"
        on:click={() => {
          localStorage.removeItem("auth");
          $authStore = null;
        }}
      >
        Logout</a
      >
    </Button>
  </nav>
</header>