<script>
  export let variant = "filled",
    shadow = false,
    type = false,
    className = "";
  export { className as class };
</script>

<!--@component
Our themed button. Able to pass in classes including Tailwind.
@variant `="outline"` for variant
@shadow box-shadow
-->

<!-- TODO: Add styles for input submit type if needed based on conditions -->
<!-- TODO: Disabled styles -->
<button
  class="themed-btn {className}"
  {type}
  class:themed-btn-filled={variant == "filled"}
  class:themed-btn-delete={variant == "delete"}
  class:themed-btn-outline={variant == "outline"}
  class:shadow-md={shadow}
  on:click><slot /></button
>
