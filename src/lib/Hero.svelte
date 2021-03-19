<script>let open = false;
  import ModalBox from "$lib/ModalBox.svelte";
  import AuthForm from "$lib/AuthForm.svelte";
  let login = false;
  let clickOutside = true;
  $: if (open == true && typeof login)
    !(clickOutside = false) && setTimeout(() => (clickOutside = true));
</script>

<div class="py-20 bg-indigo-500"
>
  <div class="container text-center mx-auto px-6">
    <h1 class="text-5xl font-semibold text-white">Shift planning done simple</h1>
    <hr class="my-5 mx-28 border-yellow	border-2 rounded-full">
    <h3 class="text-2xl mb-8 text-white">
      Scheduling and timesheets without the usual chaos. Just Drag, Drop and Done.
    </h3>

    <button on:click={() => (open = true) && (login = false)} class="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
      Join Today
    </button>
    <ModalBox {clickOutside} bind:open>
      <AuthForm bind:login />
    </ModalBox>
  </div>
</div>