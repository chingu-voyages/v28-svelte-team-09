<script>
  import { authStore } from "$stores/auth";
  import { employeesData } from "$stores/employee";
  import Button from "$lib/Button.svelte";
  import { employeesByUserID } from "$gql/employee";
  import AddEmployeeModal from "$lib/schedule/AddEmployeeModal.svelte";
  import AppHeader from "$lib/AppHeader.svelte";

  let addEmployee = false;
  const employeesOp = employeesByUserID({ id: $authStore.id });
  console.log(employeesOp);

  $: if (employeesOp.data) {
    $employeesData = [...employeesOp.data.result.employees.data];
    console.log("fetched", $employeesData);
  }
  $: console.log($employeesData);
</script>

<AppHeader />

<main>
  <!--TODO:remove button. test button to try the add employee query -->
  <Button on:click={() => (addEmployee = true)}>Add Employee</Button>
  <AddEmployeeModal open={addEmployee} />
</main>
