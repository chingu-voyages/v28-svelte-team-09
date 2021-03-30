<script>
  import Button from "$lib/Button.svelte";
  import { authStore } from "$stores/auth";
  import { page } from "$stores/pages";
</script>

<header class="flex row items-center justify-between px-4 lg:px-20">
  <!-- Logo -->
  <div class="flex items-center">
    <img src="/images/logo.webp" alt="DShift logo" class="h-16 hidden md:block" />
    <h2 class="font-logo text-2xl font-medium hidden md:block">DShift</h2>
    <div class="mx-2 md:mx-5">
      <a class="text-lg font-semibold p-5" class:selected="{$page === '/schedule' ? 'selected' : ''}" on:click={() => page.update(() => '/schedule')} href="/schedule">Schedule</a>
      <a class="text-lg font-semibold p-5" class:selected="{$page === '/people' ? 'selected' : ''}" on:click={() => page.update(() => '/people')} href="/people">People</a>
    </div>
  </div>

  <nav class="flex items-center">
      <a
        href="/"
        on:click={() => {
          localStorage.removeItem("auth");
          $authStore = null;
        }}
      ><Button>Logout</Button>
        </a
      >
  </nav>
</header>

<style>
  .selected {
		background-color: #e0e7ff;
    padding: 1.25rem;
	}
</style>