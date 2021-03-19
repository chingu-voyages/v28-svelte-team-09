<script>let open = false;
  import ModalBox from "$lib/ModalBox.svelte";
  import AuthForm from "$lib/AuthForm.svelte";
  let login = false;
  let clickOutside = true;
  $: if (open == true && typeof login)
    !(clickOutside = false) && setTimeout(() => (clickOutside = true));
</script>

<header class="py-20 bg-indigo-500 relative"
>
<svg class="bottom-0" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon fill="white" points="0,100 100,0 100,100"/>
  </svg>
  <div class="container text-center mx-auto pt-6 pb-20">
    <h1 class="text-5xl font-semibold text-white">Shift planning done simple</h1>
    <hr class="my-5 mx-28 border-yellow	border-2 rounded-full">
    <h3 class="text-2xl mb-8 text-white">
      Scheduling and timesheets without the usual chaos. Just Drag, Drop and Done.
    </h3>

    <button on:click={() => (open = true) && (login = false)} class="rounded-full shadow-xl text-xl font-semibold bg-white py-3 px-6  cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow
      ">
      Join Today
    </button>
    <ModalBox {clickOutside} bind:open>
      <AuthForm bind:login />
    </ModalBox>
  </div>
</header>

<main class="text-center bg-white relative pb-32">
  
</main>

<footer class="text-center bg-indigo-500 relative">
  <svg style="top-0"	 viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon fill="white" points="0,0 100,0 100,100"/>
  </svg>
  <h2 class="font-logo text-white text-2xl font-medium pt-32">DShift</h2>
  <hr class="my-5 mx-28 border-yellow	border-2 rounded-full">
  <h3 class="text-md pb-4 text-white">
    © DShift, Inc. 2021. Built with ❤️ by Svelte-Team-09
  </h3>
</footer>

<style>
  svg {
  position: absolute;
  width: 100%;
  height: 10vw;
  /* set height to pixels if you want angle to change with screen width */
}
</style>