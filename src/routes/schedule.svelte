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
    $employeesData = [...$employeesOp.data.result.employees.data];
    console.log("fetched", $employeesData);
  }
</script>

<AppHeader />

<main class="text-center bg-white">
  <section class="m-3 flex flex-col items-center space-y-3">
    <h3 class="bg-indigo-100 w-1/2 font-semibold p-2 text-lg rounded-md">
      <!-- TODO: {companyName} -->
      Nemesis Coffee
    </h3>
    <!-- TODO: Styles and date picker (?) -->
    <div class="space-x-2">
      <button class="bg-indigo-100 px-5 py-1 rounded-l-md font-semibold text-lg"
        >{"<"}</button
      ><button class="bg-indigo-100 px-5 py-1 font-semibold text-lg">
        <!-- TODO: {curDay} -->
        01 Mar</button
      ><button
        class="bg-indigo-100 px-5 py-1 rounded-r-md font-semibold text-lg"
        >{">"}</button
      >
    </div>
    <Button
      >Publish Shifts
      <!-- TODO: {numShifts}, disabled styles & state -->
    </Button>
  </section>

  <!--TODO:remove button. test button to try the add employee query -->
  <Button on:click={() => (addEmployee = true)}>Add Employee</Button>
  <AddEmployeeModal bind:open={addEmployee} />
  <div><h1 class="my-44">Spacer</h1></div>
</main>
