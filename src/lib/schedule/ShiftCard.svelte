<script>
  export let empty,
    title = empty ? "Open/Empty Shifts" : "N/A",
    wageTime = empty ? "7.00Hrs" : "",
    src = "/images/icons/themed-user-circle-solid.svg";
</script>

<div class="flex space-x-5 items-center w-full bg-white py-4 px-6">
  <img class="rounded-full shadow-md" {src} width="55" alt="default user" />
  <div class="flex flex-col place-items-center place-content-center w-full">
    <h3 class="font-semibold line-clamp-1">{title}</h3>
    <!-- TODO: {openTime}Hrs-->
    {#if wageTime}
      <p class="text-indigo-100">{wageTime}</p>
    {/if}
  </div>
</div>
