<script>let open = false;
  import ModalBox from "$lib/ModalBox.svelte";
  import AuthForm from "$lib/AuthForm.svelte";

  let login = false;
  let clickOutside = true;

  $: if (open == true && typeof login)
    !(clickOutside = false) && setTimeout(() => (clickOutside = true));
</script>

<header class="pt-20 bg-indigo-500 relative"
>
  <div class="container text-center mx-auto py-6">
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

<main class="text-center bg-indigo-500 relative md:pb-20">
  <div class="main_bg"></div>
  <div class="container mx-auto relative">
    <div class="hidden md:grid grid-cols-1 justify-items-center md:justify-items-stretch md:grid-cols-4 p-5 lg:px-10"> 
      <div class="col-span-3 rounded overflow-hidden border-indigo-500 border-2 shadow-lg mx-5 my-5">
        <img class="mx-auto" src="/images/schedule.webp" alt="Desktop">
      </div>
      <div class="col-span-1 mx-5 my-5">
        <img class="mx-auto shadow-lg rounded-3xl border-indigo-500 border-2" src="/images/phone.webp" alt="Schedule">
      </div>
    </div>
    <div class="grid grid-cols-1 justify-items-center md:grid-cols-3 p-5 lg:px-10">  
      <div class="rounded w-10/12 md:w-11/12 bg-white border-indigo-500 border-2 shadow-lg mx-5 my-5">
        <img class="mx-auto pt-4 icon" src="/images/minutes.svg" alt="Schedule">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Schedule in minutes</div>
          <p>
            Create the best schedule for your team, fast
          </p>
        </div>
      </div>
      <div class="rounded w-10/12 bg-white border-indigo-500 border-2 shadow-lg mx-5 my-5">
        <img class="mx-auto pt-4 icon" src="/images/mail.svg" alt="Mail">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Send it to team</div>
          <p>
            Share the schedule you created in one click
          </p>
        </div>
      </div>
      <div class="rounded w-10/12 bg-white border-indigo-500 border-2 shadow-lg mx-5 my-5">
        <img class="mx-auto pt-4 icon" src="/images/person.svg" alt="Person">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Create staff profiles</div>
          <p>
            Add icon, position, and other team member info
          </p>
        </div>
      </div>
    </div>
  </div>
</main>

<footer class="text-center bg-indigo-500">
  <div class="container mx-auto">
    <h2 class="font-logo text-white text-2xl font-medium">DShift</h2>
    <hr class="my-5 mx-28 border-yellow	border-2 rounded-full">
    <h3 class="text-md pb-4 text-white">
      © DShift, Inc. 2021. Built with ❤️ by Svelte-Team-09
    </h3>
  </div>
</footer>

<style>
  .icon {
    width: 30%;
  }
  .main_bg {
    position: absolute;
    top: 50%;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: white;
    transform: skewY(-3deg);
    transform-origin: top left;
  }

  @screen md {
    .main_bg {
      top: 40%;
      height: 60%;
    }
  }
</style>