<script>
  export let variant = "filled",
    shadow = false,
    type = false,
    className = "";
  let tw;
  export { tw as class };
</script>

<!--@component
Our themed button. Able to pass in classes including Tailwind.
@variant `="outline"` for variant
@shadow box-shadow
-->

<!-- TODO: Add styles for input submit type if needed based on conditions -->
<!-- TODO: Disabled styles -->
<button
  class="[ {className} themed-btn ] {tw}"
  {type}
  class:themed-btn-filled={variant == "filled"}
  class:themed-btn-outline={variant == "outline"}
  class:shadow-md={shadow}
  on:click><slot /></button
>
