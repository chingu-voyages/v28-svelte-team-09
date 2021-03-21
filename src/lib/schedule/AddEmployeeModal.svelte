<script>
  import { authStore } from "$stores/auth"
  import Button from "$lib/Button.svelte";
  import Input from "$lib/Input.svelte";
  import ModalBox from "$lib/ModalBox.svelte";
  import { useCreateEmployee } from "$gql/employee.js"

  let name, email, phone
  let employeeAddError
  export let open = false;
 

  $:  [ createEmployee, employeeStore ] = useCreateEmployee()
  $: console.log($employeeStore)
  $: if($employeeStore.error){
    employeeAddError = $employeeStore.error
  }

  function handleSubmit(){
    createEmployee({
      name, phone, email, id: $authStore.id
    })
    
    //TREAT CREATION ERR IF NECESSARY
    if(employeeAddError) console.log("ERR: error creating employee")

    open = !open
  }
</script>

<ModalBox {open}>
  <form on:submit|preventDefault={handleSubmit}>
  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div class="sm:flex sm:items-start">
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 class="text-lg font-main leading-6 font-medium" id="modal-headline">
          Add new Employee
        </h3>
        <div class="mt-2">
          <p class="text-sm font-main text-indigo-400 mb-6">
            Add as many new people as you want by typing their names and email
            addresses. You can always edit someone's details later, under People
            tab.
          </p>
          
            <div class="input-box flex justify-between">
              <Input id="name" label="Name*" bind:value={name} />
              <Input id="email" label="Email" bind:value={email}/>
              <Input id="phone" label="Phone #" bind:value={phone} />
            </div>
                
        </div>
      </div>
    </div>
  </div>
  <div
    class="bg-gray-50 px-4 py-3 grid gap-2 sm:px-6 sm:flex sm:flex-row-reverse"
  >
    <Button type="submit">Save</Button>
    <Button type="reset" on:click={() => (open = !open)}>Cancel</Button>
    <!-- <button
        class="mx-2 bg-transparent shadow cursor-pointer hover:bg-indigo-500 focus:outline-none text-indigo-500 focus:border-indigo-500 font-main font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
        type="button"
        on:click={() => (open = !open)}
      >
        Cancel
      </button> -->
  </div>
</form>
</ModalBox>

<style>
  .input-box > :global(div) {
    width: 23%;
  }
  .input-box > :global(div:first-child) {
    width: 50%;
  }
</style>
