<script>
  import { authStore } from "$stores/auth";
  import { employeesData } from "$stores/employee";
  import Button from "$lib/Button.svelte";
  import { employeesByUserID } from "$gql/employee";
  import AddEmployeeModal from "$lib/schedule/AddEmployeeModal.svelte";
  import AppHeader from "$lib/AppHeader.svelte";

  let addEmployee = false;

  //fetch employee data from DB
  const employeesOp = employeesByUserID({ id: $authStore.id });
  $: if ($employeesOp.data?.result != null) {
    $employeesData = [...employeesOp.data.result.employees.data];
    console.log("fetched", $employeesData);
  }
</script>

<AppHeader />

<main class="text-center bg-white">
  <!--TODO:remove button. test button to try the add employee query -->
  <Button on:click={() => (addEmployee = true)}>Add Employee</Button>
  <AddEmployeeModal show={addEmployee} />
  <div><h1 class="my-44">Spacer</h1></div>
</main>
