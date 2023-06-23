<script>
  import Dashboard from "$lib/Dashboard.svelte";
  import { loggedIn } from "../stores";
  import Hero from "$lib/Hero.svelte";
</script>

{#if $loggedIn}
  <div class="shadow-2xl h-[90vh] rounded-2xl p-4 overflow-y-auto">
    <div>
      <Dashboard />
    </div>
  </div>
{:else}
  <div class="flex flex-col items-center justify-center h-[90vh] m-2">
    <Hero />
  </div>
{/if}
