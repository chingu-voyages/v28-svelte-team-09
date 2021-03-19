<script>
  import { authStore } from "$stores/auth";
  import Button from "$lib/Button.svelte";

  let name = "";
  let password = "";
  let confirm = "";
  export let login = false;

  const labelHandler = (e) => e.target.previousElementSibling.focus();
  if ($authStore) location.pathname = "./schedule";

  async function handleSubmit() {
    if (!login && password != confirm) return;
    var res = await fetch(
      `/.netlify/functions/${login ? "signin" : "signup"} `,
      {
        method: "POST",
        body: JSON.stringify({ name, password }),
      }
    );
    var { secret = "", instance: { "@ref": { id } } = "" } = await res.json();
    if (secret) {
      var authData = { secret, id };
      localStorage.setItem("auth", JSON.stringify(authData));
      location.pathname = "/schedule";
    } else {
      // You can deal w/ errors here, likely password invalid or network error.
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="shadow-xl text-center p-10 bg-white max-w-xl rounded">
    {#if !login}
      <h1 class="text-4xl text-center font-black mb-4">
        Try <span class="font-logo font-normal">DShift</span> today!
      </h1>
    {:else}
      <h1 class="text-4xl text-center font-black mb-4">Glad you are back!</h1>
    {/if}
    <div class="mb-4 relative">
      <input
        autofocus
        class="[ input ] border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus:border-indigo-500 focus:outline-none active:outline-none active:border-indigo-500"
        bind:value={name}
        class:filled={name}
        id="email"
        type="text"
        aria-labelledby="email-label"
      />
      <span
        on:click={labelHandler}
        id="email-label"
        class="[ label ] absolute mb-0 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
        >Username
      </span>
    </div>
    <div class="mb-4 relative">
      <input
        class="[ input ] border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus:border-indigo-500 focus:outline-none active:outline-none active:border-indigo-500"
        bind:value={password}
        class:filled={password}
        id="password"
        type="password"
        aria-labelledby="password-label"
      />
      <span
        on:click={labelHandler}
        id="password-label"
        class="[ label ] absolute mb-0 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
      >
        Password
      </span>
    </div>
    {#if !login}
      <div class="mb-4 relative">
        <input
          class="[ input ] border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus:border-indigo-500 focus:outline-none active:outline-none active:border-indigo-500"
          bind:value={confirm}
          class:filled={password}
          id="password"
          type="password"
          aria-labelledby="password-label"
        />
        <span
          on:click={labelHandler}
          id="password-label"
          class="[ label ] absolute mb-0 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
        >
          Confirm
        </span>
      </div>
    {/if}
    <div>
      <Button>Submit</Button>
      {#if !login}
        <div class="my-2">
          <span class="mt-6 text-center text-gray-900">
            Already a member?
          </span>
          <span class="mt-2 text-center text-gray-600">
            <a
              on:click={() => login = true}
              href="#"
              class="font-medium text-indigo-500 hover:text-indigo-400"
            >
              Login here
            </a>
          </span>
        </div>
      {/if}
    </div>

    {#if login}
      <div class="my-2">
        <span class="mt-6 text-center text-gray-900"> Not a member yet? </span>
        <span class="mt-2 text-center text-gray-600">
          <a 
            on:click={() => login = false}
            href="#"
            class="text-indigo-500 hover:text-indigo-400"
          >
            Register now!
          </a>
        </span>
      </div>
    {/if}
  </div>
</form>

<style>
  .input {
    transition: border 0.2s ease-in-out;
    min-width: 280px;
  }

  .input:focus + .label,
  .input:active + .label,
  .input.filled + .label {
    font-size: 0.75rem;
    transition: all 0.2s ease-out;
    top: -1.6rem;
    color: #667eea;
  }

  .label {
    transition: all 0.2s ease-out;
    top: -0.8rem;
    left: 0;
  }
</style>
