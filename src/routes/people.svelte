<script>
  import AppHeader from "$lib/AppHeader.svelte";
  import { authStore } from "$stores/auth";
  import { employeesData } from "$stores/employee";
  import { employeesByUserID } from "$gql/employee";
  import AddEmployeeModal from "$lib/schedule/AddEmployeeModal.svelte";

  let fetchedEmployees;

  const employeesOp = employeesByUserID({ id: $authStore.id });
  $: if (employeesOp.data) {
    fetchedEmployees = [...employeesOp.data.result.employees.data];
    employeesData.set([...employeesOp.data.result.employees.data]);
  }
</script>

<AppHeader />

<main class="text-center bg-white">
  {#if fetchedEmployees}
    {#each fetchedEmployees as employee}
      <div>
        <h1 class="my-12 text-xl">{employee.name}</h1>
        <p>{employee.email}</p>
      </div>
    {/each}
  {/if}
</main>
