<script>
  import { authStore } from "$stores/auth";
  import ModalBox from "$lib/ModalBox.svelte";
  import Button from "$lib/Button.svelte";
  import Select from "./Select.svelte";
  import AreaModal from "./AreaModal.svelte";

  export let open = false;
  let clickOutside = true;

  let employeeOpts = [{ name: "Moo" }, { name: "Wee" }];
  let areaOpts = [{ name: "Default", color: "green" }];

  let employeeIndex, areaIndex, start, finish, breakMins, notes;
  const init = {
    employeeIndex: -1,
    areaIndex: -1,
    start,
    finish,
    breakMins,
    notes,
  };

  let areaOpen;
  $: !areaOpen && (open = true);

  function reset() {
    ({ employeeIndex, areaIndex, start, finish, breakMins, notes } = init);
  }

  async function handleSubmit() {
    // TODO: Wire up submit mutation here
    console.log(employeeIndex, areaIndex, start, finish, breakMins, notes);
    // open = false;
    // reset();
  }
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
            class="text-lg font-main leading-6 font-medium mb-4"
            id="modal-headline"
          >
            Shift: Tue 02 Mar
          </h3>
          <div
            class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 justify-between"
          >
            <Select
              label="Assigned to"
              options={employeeOpts}
              class="w-full sm:w-52"
              bind:selectedIndex={employeeIndex}
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
              area
              options={areaOpts}
              class="w-full sm:w-52"
              bind:selectedIndex={areaIndex}
              let:selectedIndex
            >
              <button
                slot="area"
                class="flex rounded items-center"
                on:click={() => !(open = false) && (areaOpen = !areaOpen)}
              >
                <img
                  class="mr-1"
                  src="/images/icons/themed-edit-solid.svg"
                  width="15"
                  alt="Edit Area"
                />
                <span class="block text-sm font-medium text-indigo-400"
                  >Edit area details</span
                >
              </button>
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

          <div class="flex flex-wrap space-y-4">
            <div class="mr-4 mt-4">
              <label
                for="start"
                class="block text-sm font-medium text-indigo-400">Start</label
              >
              <input
                id="start"
                bind:value={start}
                class="border relative border-gray-300 appearance-none py-1 px-2 focus:border-indigo-500 focus:outline-none active:outline-none active:border-indigo-500 rounded"
                type="time"
              />
            </div>
            <div class="mr-4">
              <label
                for="finish"
                class="block text-sm font-medium text-indigo-400">Finish</label
              >
              <input
                id="finish"
                bind:value={finish}
                class="border relative border-gray-300 appearance-none py-1 px-2 focus:border-indigo-500 focus:outline-none active:outline-none active:border-indigo-500 rounded"
                type="time"
              />
            </div>
            <div>
              <label
                for="break"
                class="block text-sm font-medium text-indigo-400"
                title="mins">Break</label
              >
              <input
                id="break"
                bind:value={breakMins}
                class="border relative border-gray-300 appearance-none py-1 px-2 focus:border-indigo-500 focus:outline-none active:outline-none active:border-indigo-500 rounded"
                type="number"
                max="60"
                min="0"
              />
            </div>
          </div>
          <div class="mt-4">
            <label
              for="notes"
              class="block text-sm font-medium text-indigo-400"
              title="mins">Notes</label
            >
            <textarea
              class="w-full border relative border-gray-300 appearance-none py-1 px-2 focus:border-indigo-500 focus:outline-none active:outline-none active:border-indigo-500 rounded placeholder-indigo-200"
              name="Notes"
              id="notes"
              bind:value={notes}
              cols=""
              rows="4"
              placeholder="Add a note to this shift, the employee will be able to see your notes when schedule is published"
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

<AreaModal bind:open={areaOpen} />
