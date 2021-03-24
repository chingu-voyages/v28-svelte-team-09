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

<footer class="text-center bg-indigo-500">
  <div class="container mx-auto">
    <h2 class="font-logo text-white text-2xl font-medium">DShift</h2>
    <hr class="my-5 mx-28 border-yellow	border-2 rounded-full" />
    <h3 class="text-md pb-4 text-white">
      © DShift, Inc. 2021. Built with ❤️ by Svelte-Team-09
    </h3>
  </div>
</footer>


