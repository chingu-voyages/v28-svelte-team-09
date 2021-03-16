<script>
  // TODO: If you care about dynamic metatags, add them here. Otherwise, delete example later.
  // import { metatags } from '@roxi/routify'
  // metatags.title = 'My Routify app'
  // metatags.description = 'Description coming soon...
  import Input from "$lib/dev/Input.svelte";
  import { authStore } from "../stores/auth";
  let value = "";
</script>

<!-- <h1 class="bg-red-100 text-blue-500">
  Add your tailwind classes to see HMR in action!
</h1> -->
{#if $authStore?.secret}
  <div style="display:none;">
    {(location.pathname = "/schedule")}
  </div>
{:else}
  <section>
    <div>Welcome to DSHIFT</div>
    <a href="/signin" target="_self" class="link">Sign in</a>
    <a href="/signup" target="_self" class="link">Sign up</a>
  </section>
  <Input id="example" label="Some input" bind:value />
{/if}
