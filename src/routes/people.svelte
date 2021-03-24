<script>
  import AppHeader from "$lib/AppHeader.svelte";
  import { authStore } from "$stores/auth";
  import { employeesData } from "$stores/employee";
  import { employeesByUserID } from "$gql/employee";
  import Button from "$lib/Button.svelte";

  const employeesOp = employeesByUserID({ id: $authStore.id });
  $: if ($employeesOp.data) {
    $employeesData = [...$employeesOp.data.result.employees.data];
  }
</script>

<AppHeader />

<main class="text-center bg-white mx-6 mb-12">
  <div class="flex justify-between pt-2">
    <h3 class="bg-indigo-100 font-semibold py-2 px-2 text-lg rounded">
      <!-- fetch company name -->
      Nemesis Coffee
    </h3>
  </div>
  <div class="text-left py-2">
    <h3 class="font-semibold text-2xl">
      People
    </h3>
    <!-- add search on keyUp functionality -->
    <input class="border border-gray-400 appearance-none rounded w-48 px-2 my-2 mr-2 py-2 focus:border-indigo-500 focus:outline-none active:outline-none active:border-indigo-500" placeholder="Search People ...">
    <Button
      >Add People
    </Button>
  </div>
  <div class="flex justify-between">
    <h3 class="font-semibold text-lg">
      Name
    </h3>
    <h3 class="font-semibold text-lg">
      Actions
    </h3>
  </div>

  {#each $employeesData as employee}
    <div>
      <hr class="my-3 border-indigo-500	border-1" />
      <div class="flex justify-between">
        <div class="flex items-center">
          <div class="p-3 bg-indigo-300 icon rounded-full w-12 h-12 text-white font-semibold">{employee.name.match(/[A-Z]/g).join('')}</div>
          <h1 class=" px-3 text-xl">{employee.name}</h1>
        </div>
        <div class="flex items-center">
          <div class="mx-3">
            <Button variant="outline"
            >View
          </Button>
          </div>
          <Button variant="outline"
            >Edit
          </Button>
        </div>
      </div>
    </div>
  {/each}
</main>
