<script>
  import { goto } from "$app/navigation";
  import Button from "$lib/Button.svelte";
  import { authStore } from "$stores/auth";
  const aStyles =
    "text-lg font-semibold p-5 focus:outline-none ring-inset focus:ring-4 focus:rounded focus:ring-indigo-500 transition-all";
</script>

<header class="flex row items-center justify-between px-4 lg:px-20">
  <!-- Logo -->
  <div class="flex items-center">
    <img
      src="/images/logo.webp"
      alt="DShift logo"
      class="h-16 hidden md:block"
    />
    <h2 class="font-logo text-2xl font-medium hidden md:block">DShift</h2>
    <div class="mx-2 md:mx-5">
      <a
        class={aStyles}
        class:selected={typeof window !== "undefined" &&
        location.pathname === "/schedule"
          ? "selected"
          : ""}
        href="/schedule">Schedule</a
      >
      <a
        class={aStyles}
        class:selected={typeof window !== "undefined" &&
        location.pathname === "/people"
          ? "selected"
          : ""}
        href="/people">People</a
      >
    </div>
  </div>

  <nav class="flex items-center">
    <Button
      on:click={() => {
        localStorage.removeItem("auth");
        $authStore = null;
        goto("/");
      }}>Logout</Button
    >
  </nav>
</header>

<style>
  .selected {
    background-color: #e0e7ff;
    padding: 1.25rem;
  }
</style>
