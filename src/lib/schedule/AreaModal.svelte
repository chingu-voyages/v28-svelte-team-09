<script>
  import Button from "$lib/Button.svelte";
  import Input from "$lib/Input.svelte";
  import ModalBox from "$lib/ModalBox.svelte";
  import { slide } from "svelte/transition";
  import Select from "./Select.svelte";
  export let open = false;
  export let queriedAreas = []; // TODO: Add queried areas

  let areasToAdd = [{ name: "Some Area Name", color: "green" }];
  $: if (queriedAreas.length) {
    areasToAdd = [...queriedAreas];
  }
  function newArea() {
    return {
      name: "",
      color: "green",
    };
  }

  // TODO: Submit mutation
  async function handleSubmit() {}
</script>

<ModalBox bind:open clickOutside>
  <form
    on:submit|preventDefault={handleSubmit}
    on:reset={() => !(open = false) && reset()}
  >
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            class="text-lg font-main leading-6 font-medium mb-4"
            id="modal-headline"
          >
            Edit Areas
          </h3>

          <div class="space-y-4">
            {#each areasToAdd as { name, color }, i (areasToAdd[i])}
              <div
                transition:slide
                class="[ input-box ] flex justify-between items-center"
              >
                <Input
                  required
                  id="name"
                  label="Area Name*"
                  bind:value={name}
                />
                <Select
                  options={["blue", "red", "purple", "green"]}
                  label={i == 0 && "Color"}
                  class="w-[4.7rem] color-select {i == 0
                    ? 'mt-[-1.5rem]'
                    : 'mt-[-0.2rem]'} ml-4 mr-4"
                  selectedIndex={0}
                  ><span slot="selected" class="block">
                    <div
                      class="ml-1 w-5 h-5 rounded-full border border-white"
                      style="background: green"
                    />
                  </span>
                  <div
                    class="w-4 h-4 rounded-full border border-white"
                    style="background: {color}"
                    slot="item"
                    let:i
                    let:option={color}
                  />
                </Select>

                <button
                  type="button"
                  class="h-4 focus:ring-red-500 rounded"
                  on:click={() =>
                    areasToAdd.length > 1
                      ? (areasToAdd = areasToAdd.splice(i, 1) && [
                          ...areasToAdd,
                        ])
                      : Object.values(areasToAdd[i]).some((v) => v) && reset()}
                >
                  <img
                    width="15"
                    src="/images/icons/themed-trash-alt-solid.svg"
                    alt="trash icon"
                  />
                </button>
              </div>
            {/each}

            <button
              type="button"
              class="rounded flex items-center"
              on:click={() => (areasToAdd = [...areasToAdd, newArea()])}
            >
              <img
                class="mr-2"
                src="/images/icons/themed-plus-circle-solid.svg"
                width="15"
                alt="add more icon"
              /> Add more
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-gray-50 px-4 py-3 grid gap-2 sm:px-6 sm:flex sm:flex-row-reverse"
    >
      <Button type="submit">Save</Button>
      <Button type="reset" variant="outline">Cancel</Button>
    </div>
  </form>
</ModalBox>

<style>
  .input-box :global(button[aria-labelledby="listbox-label"]) {
    height: 3.4rem;
    @apply border-gray-400;
  }
  div :global(.color-select ul) {
    max-height: 7rem;
  }
  div :global(.color-select li) {
    @apply px-2;
  }
  div :global(.color-select li > span) {
    @apply pr-2;
  }
</style>
