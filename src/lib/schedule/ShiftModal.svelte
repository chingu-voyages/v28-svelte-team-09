<script>
  import { authStore } from "$stores/auth";
  import ModalBox from "$lib/ModalBox.svelte";
  import Button from "$lib/Button.svelte";
  import Input from "$lib/Input.svelte";
  import Select from "./Select.svelte";

  export let open = false;
  let clickOutside = true;

  function reset() {
    // employeesToAdd = [newEmployee()];
  }

  async function handleSubmit() {
    open = false;
    reset();
  }

  let employeeOpts = [{ name: "Moo" }, { name: "Wee" }];
  let areaOpts = [{ name: "Default", color: "green" }];
</script>

<ModalBox bind:open {clickOutside}>
  <form
    on:submit|preventDefault={handleSubmit}
    on:reset={() => !(open = false) && reset()}
  >
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            class="text-lg font-main leading-6 font-medium"
            id="modal-headline"
          >
            Shift: Tue 02 Mar
          </h3>
          <div class="mt-4 flex space-x-4">
            <Select
              label="Assigned to"
              options={employeeOpts}
              class="w-52"
              let:selectedIndex
            >
              <span class="ml-3 block truncate"> Select an employee... </span>
              <div slot="item" class="contents" let:option={{ name }} let:i>
                <span
                  class="{selectedIndex == i
                    ? 'font-semibold'
                    : 'font-normal'} ml-3 block truncate"
                >
                  {name}
                </span>
              </div>
            </Select>
            <Select
              label="Area"
              options={areaOpts}
              class="w-52"
              let:selectedIndex
            >
              <span class="ml-3 block truncate"> No areas yet... </span>
              <div
                slot="item"
                class="contents"
                let:option={{ color, name }}
                let:i
              >
                <span
                  class="{selectedIndex == i
                    ? 'font-semibold'
                    : 'font-normal'} ml-3 truncate flex items-center"
                >
                  <div
                    class="w-4 h-4 rounded-full border border-white"
                    style="background: {color}"
                  />
                  <span class="ml-4">
                    {name}
                  </span>
                </span>
              </div>
            </Select>
          </div>

          <div class="mt-4 space-x-4 flex">
            <input
              class="border border-gray-400 appearance-none p-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded"
              type="time"
            />
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
