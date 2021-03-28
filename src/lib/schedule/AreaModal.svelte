<script>
  import Select from "./Select.svelte";
</script>

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
