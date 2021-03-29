<script>
  import Button from "$lib/Button.svelte";
  import ModalBox from "$lib/ModalBox.svelte";
  import Select from "./Select.svelte";
  export let open = false;

  async function handleSubmit() {}
</script>

<ModalBox bind:open clickOutside>
  <form
    on:submit|preventDefault={handleSubmit}
    on:reset={() => !(open = false) && reset()}
  >
    <Select label="Color" class="w-[4.7rem]" selectedIndex={0}
      ><span slot="selected" class="block">
        <div
          class="ml-1 w-5 h-5 rounded-full border border-white"
          style="background: green"
        />
      </span>
      <div
        class="w-4 h-4 rounded-full border border-white"
        style="background: blue"
        slot="item"
        let:i
        let:option={{ name, color }}
      />
    </Select>
    <div
      class="bg-gray-50 px-4 py-3 grid gap-2 sm:px-6 sm:flex sm:flex-row-reverse"
    >
      <Button type="submit">Save</Button>
      <Button type="reset" variant="outline">Cancel</Button>
    </div>
  </form>
</ModalBox>
