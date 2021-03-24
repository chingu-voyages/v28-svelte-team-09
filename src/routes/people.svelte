<script>
  import AppHeader from "$lib/AppHeader.svelte";
  import { authStore } from "$stores/auth";
  import { employeesData } from "$stores/employee";
  import { employeesByUserID } from "$gql/employee";

  const employeesOp = employeesByUserID({ id: $authStore.id });
  $: if ($employeesOp.data) {
    $employeesData = [...employeesOp.data.result.employees.data];
  }
</script>

<AppHeader />

<main class="text-center bg-white">
  {#if $employeesData}
    {#each $employeesData as employee}
      <div>
        <h1 class="my-12 text-xl">{employee.name}</h1>
        <p>{employee.email}</p>
      </div>
    {/each}
  {/if}
</main>
