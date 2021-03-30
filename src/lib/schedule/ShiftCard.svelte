<script>
  export let vacant = false,
    title = vacant ? "Vacant Shifts" : "N/A",
    timeRate = vacant ? "7.00Hrs" : "",
    src = "/images/icons/themed-user-circle-solid.svg";
</script>

<div class="flex space-x-5 items-center w-full bg-white py-4 px-6">
  <img class="rounded-full shadow-md" {src} width="55" alt="default user" />
  <div class="flex flex-col place-items-center place-content-center w-full">
    <h3 class="font-semibold line-clamp-1">{title}</h3>
    <!-- TODO: {openTime}Hrs-->
    {#if timeRate}
      <p class="text-indigo-100">{timeRate}</p>
    {/if}
  </div>
</div>
