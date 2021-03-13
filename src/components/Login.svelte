<script>
  import { focus } from "@roxi/routify";
  let email = "";
  let password = "";

  const labelHandler = (e) => e.target.previousElementSibling.focus();
</script>

<div class="shadow-xl p-10 bg-white max-w-xl rounded">
  <h1 class="text-4xl font-black mb-4">Login</h1>
  <div class="mb-4 relative">
    <input
      use:focus
      class="[ input ] border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
      bind:value={email}
      class:filled={email}
      id="email"
      type="text"
      aria-labelledby="email-label"
    />
    <span
      on:click={labelHandler}
      id="email-label"
      class="[ label ] absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
      >Email Address
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
  <button
    class="bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded"
    >Submit</button
  >
</div>

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
