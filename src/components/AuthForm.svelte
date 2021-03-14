<script>
  import { authStore } from "../stores/auth";
  import { focus } from "@roxi/routify";
  let name = "";
  let password = "";
  let confirm = "";
  export let login = false;

  const labelHandler = (e) => e.target.previousElementSibling.focus();
  `/.netlify/functions/signin`;
  if ($authStore) location.pathname = "./home";

  async function handleSubmit() {
    if (!login && password != confirm) return;

    var res = await fetch(
      `/.netlify/functions/${login ? "signin" : "signup"} `,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          password,
        }),
      }
    );
    var { secret = "", instance: { "@ref": { id } } = "" } = await res.json();
    if (secret) {
      var authData = {
        secret,
        id,
      };

      localStorage.setItem("auth", JSON.stringify(authData));
      location.pathname = "/home";
    } else {
      // You can deal w/ errors here, likely password invalid or network error.
    }
  }
</script>

<!-- class:filled={email} -->

<form on:submit|preventDefault={handleSubmit}>
  <div class="shadow-xl p-10 bg-white max-w-xl rounded">
    <h1 class="text-4xl font-black mb-4">{!login ? "Register" : " Login"}</h1>
    <div class="mb-4 relative">
      <input
        use:focus
        class="[ input ] border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
        bind:value={name}
        id="email"
        type="text"
        aria-labelledby="email-label"
      />
      <span
        on:click={labelHandler}
        id="email-label"
        class="[ label ] absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
        >Username
      </span>
    </div>
    <div class="mb-4 relative">
      <input
        class="[ input ] border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
        bind:value={password}
        class:filled={password}
        id="password"
        type="password"
        aria-labelledby="password-label"
      />
      <span
        on:click={labelHandler}
        id="password-label"
        class="[ label ] absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
      >
        Password
      </span>
    </div>
    {#if !login}
      <div class="mb-4 relative">
        <input
          class="[ input ] border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
          bind:value={confirm}
          class:filled={password}
          id="password"
          type="password"
          aria-labelledby="password-label"
        />
        <span
          on:click={labelHandler}
          id="password-label"
          class="[ label ] absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
        >
          Confirm
        </span>
      </div>
    {/if}
    <div>
      <button
        class="bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded mb-4"
        >Submit</button
      >
      {#if !login}
        <span class="ml-6">
          <span class="mt-6 text-center  text-gray-900"> or </span>
          <span class="mt-2 text-center text-sm text-gray-600">
            <a
              href="/signin"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </span>
        </span>
      {/if}
    </div>

    {#if login}
      <div>
        <span class="mt-6 text-center  text-gray-900"> Not a member yet? </span>
        <span class="mt-2 text-center text-sm text-gray-600">
          <a
            href="/signup"
            class="font-medium text-indigo-600 hover:text-indigo-500"
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
