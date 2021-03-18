<script>
  import { clickOutside as clickOutsideAction } from "$utils/actions";
  import { fade } from "svelte/transition";
  export let open = false;
  export let clickOutside = false;
  let outReady = false;
  $: open ? setTimeout(() => (outReady = true)) : (outReady = false);
</script>

<!-- @component
@open Modal open or closed
@clickOutside enable closing on clickOutside
-->

{#if open}
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 200 }}
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75" />
      </div>

      <!-- Trick: Center modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        use:clickOutsideAction={{
          enabled: clickOutside,
          cb: () => outReady && (open = false),
        }}
      >
        <slot />
      </div>
    </div>
  </div>
{/if}
