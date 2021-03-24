<script>
  import { authStore } from "$stores/auth";
  import { employeesData } from "$stores/employee";
  import Button from "$lib/Button.svelte";
  import { employeesByUserID } from "$gql/employee";
  import AddEmployeeModal from "$lib/schedule/AddEmployeeModal.svelte";
  import AppHeader from "$lib/AppHeader.svelte";

  let addEmployee = false;
  let fetchedEmployees;

  //fetch employee data from DB
  const employeesOp = employeesByUserID({ id: $authStore.id });
  $: if (employeesOp.data) {
    fetchedEmployees = [...employeesOp.data.result.employees.data];
    employeesData.set([...employeesOp.data.result.employees.data]);
    console.log("fetched", fetchedEmployees);
  }
</script>

<AppHeader />

<main class="text-center bg-white">
  <!--TODO:remove button. test button to try the add employee query -->
  <Button on:click={() => (addEmployee = true)}>Add Employee</Button>
  <AddEmployeeModal show={addEmployee} />
  <div><h1 class="my-44">Spacer</h1></div>
</main>

<footer class="text-center bg-indigo-500">
  <div class="container mx-auto">
    <h2 class="font-logo text-white text-2xl font-medium">DShift</h2>
    <hr class="my-5 mx-28 border-yellow	border-2 rounded-full" />
    <h3 class="text-md pb-4 text-white">
      © DShift, Inc. 2021. Built with ❤️ by Svelte-Team-09
    </h3>
  </div>
</footer>