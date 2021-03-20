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

<main class="text-center bg-white">
  <div class="flex justify-center p-10">  
    <div class="max-w-sm rounded overflow-hidden border-indigo-500 border-2 shadow-lg mx-5 card">
      <img class="mx-auto pt-4" src="/images/minutes.svg" alt="Schedule">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Schedule in minutes</div>
        <p>
          Create the best schedule for your team, fast
        </p>
      </div>
    </div>
    <div class="max-w-sm rounded overflow-hidden border-indigo-500 border-2 shadow-lg mx-5 card">
      <img class="mx-auto pt-4" src="/images/mail.svg" alt="Mail">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Send it to team</div>
        <p>
          Share the schedule you created in one click
        </p>
      </div>
    </div>
    <div class="max-w-sm rounded overflow-hidden border-indigo-500 border-2 shadow-lg mx-5 card">
      <img class="mx-auto pt-4" src="/images/person.svg" alt="Person">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Create staff profiles</div>
        <p>
          Add icon, position, and other team member info
        </p>
      </div>
    </div>
  </div>
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
  img {
    width: 30%;
  }

  .card {
    width: 30%;
  }
</style>