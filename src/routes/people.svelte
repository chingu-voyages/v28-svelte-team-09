<script>
  import AppHeader from "$lib/AppHeader.svelte";
  import { authStore } from "$stores/auth";
  import { employeesByUserID } from "$gql/employee";
  import Button from "$lib/Button.svelte";
  import AddPeopleModal from "$lib/people/AddPeopleModal.svelte";
  import ViewEmployeeModal from "$lib/people/ViewEmployeeModal.svelte";
  import EditEmployeeModal from "$lib/people/EditEmployeeModal.svelte";
  import { useDeleteEmployee } from "$gql/employee.js";
  import { slide } from "svelte/transition";

  let addEmployee = false;
  let viewEmployee = false;
  let editEmployee = false;
  let employeeNum;
  let searchTerm = "";

  const employeesOp = employeesByUserID({ id: $authStore.id });
  $: companyName = $employeesOp.data?.result.companyName ?? "Loading...";

  $: employees = $employeesOp.data?.result.employees.data.slice() ?? [];
  $: filteredList = employees.filter(
    (employee) => employee.name.toLowerCase().indexOf(searchTerm) !== -1
  );

  const [deleteEmployee, employeeOp] = useDeleteEmployee();

  //TREAT DELETION ERR IF NECESSARY
  $: if ($employeeOp.error)
    console.log("ERR: error deleting employee", $employeeOp.error);

  function handleDelete(i) {
    deleteEmployee({
      id: employees[i]._id,
    });
  }
</script>

<AppHeader />

<main class="text-center bg-white mx-3 mb-12">
  <div
    class="pt-3 flex flex-col items-center space-y-2 md:grid md:space-y-0 md:grid-cols-3 md:justify-items-start"
  >
    <h3
      class="bg-indigo-100 w-11/12 font-semibold p-2 text-lg rounded-md md:px-8 md:whitespace-nowrap md:w-auto"
    >
      {companyName}
    </h3>
  </div>
  <div class="md:text-left py-2 px-3 md:px-0">
    <h3 class="font-semibold text-2xl w-3/8">People</h3>
    <input
      class="border border-gray-400 appearance-none rounded w-5/8 px-2 my-2 mr-2 py-2 focus:border-indigo-500 focus:outline-none active:outline-none active:border-indigo-500"
      placeholder="Search People ..."
      bind:value={searchTerm}
    />
    <Button on:click={() => (addEmployee = true)}>Add People</Button>
    <AddPeopleModal bind:open={addEmployee} />
  </div>
  <div class="flex justify-between px-3 md:px-0">
    <h3 class="font-semibold text-lg">Name</h3>
    <h3 class="font-semibold text-lg">Actions</h3>
  </div>

  {#each filteredList as employee, i (employee._id)}
    <div transition:slide|local class="px-3 md:px-0">
      <hr class="my-3 border-indigo-500	border-1" />
      <div class="flex justify-between">
        <div
          class="flex items-center cursor-pointer	"
          on:click={() => {
            viewEmployee = true;
            employeeNum = i;
          }}
        >
          <div
            class="p-3 bg-indigo-300 icon rounded-full w-12 h-12 text-white font-semibold line-"
          >
            {employee.name?.match(/\b[A-Za-z]/g)?.join("") ?? ""}
          </div>
          <h1 class="px-3 text-xl">{employee.name}</h1>
        </div>
        <div class="flex items-center">
          <Button
            variant="outline"
            class="hidden md:block mx-3"
            on:click={() => {
              editEmployee = true;
              employeeNum = i;
            }}
            >Edit
          </Button>
          <Button
            variant="delete"
            class="hidden md:block"
            on:click={() => handleDelete(i)}
            >Delete
          </Button>
          <button
            type="button"
            class="h-6 focus:ring-indigo-500 rounded md:hidden mx-3"
            on:click={() => {
              editEmployee = true;
              employeeNum = i;
            }}
          >
            <img
              width="27"
              src="/images/icons/themed-edit-solid.svg"
              alt="edit icon"
            />
          </button>
          <button
            type="button"
            class="h-6 focus:ring-red-500 rounded md:hidden"
            on:click={() => handleDelete(i)}
          >
            <img
              width="21"
              src="/images/icons/themed-trash-alt-solid.svg"
              alt="trash icon"
            />
          </button>
        </div>
      </div>
    </div>
  {/each}
  <ViewEmployeeModal bind:open={viewEmployee} data={employees[employeeNum]} />
  <EditEmployeeModal bind:open={editEmployee} data={employees[employeeNum]} />
</main>
