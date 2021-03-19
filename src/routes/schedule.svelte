<script>
  // import { onMount } from "svelte"
  import { authStore } from "$stores/auth";
  // import { employeesData  } from "$stores/employee";
  import Button from "$lib/Button.svelte";
  // import { employeesByUserID } from "$gql/employee";
  import AddEmployeeModal from  "$lib/schedule/AddEmployeeModal.svelte"

  let addEmployee
  // let employees = employeesByUserID({id: $authStore.id})
  // employeesData.set(employees)
</script>

<header class="flex row items-center justify-between px-4 mt-2 lg:px-20">
  <h2 class="justify-self-start text-3xl font-logo">DShift</h2>
  <nav>
     <!--TODO:remove button. test button to try the add employee query -->
    <Button on:click={() => addEmployee = true}>
      Emplpoyee +
    </Button>

    <Button>
      <a
        href="/"
        on:click={() => {
          localStorage.removeItem("auth");
          $authStore = null;
        }}
      >
        Logout</a
      >
    </Button>
  </nav>
</header>
<!-- <Devmodal /> -->
<AddEmployeeModal open={addEmployee} />

