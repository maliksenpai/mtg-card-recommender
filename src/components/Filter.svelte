<script lang="ts">
  import Autocomplete from "./Autocomplete.svelte";
  import FilterCards from "./FilterCards.svelte";
  let showFilter = $state(false);
</script>

<Autocomplete />
<div class="bg-white p-4 flex justify-center flex-col w-[45%] radius-2 mb-4">
  <button
    class="flex flex-row justify-center gap-2"
    onclick={() => (showFilter = !showFilter)}
  >
    {showFilter ? "Hide" : "Show"} Filter
    <img
      src="/chevron-down.svg"
      class={["w-6 h-6 rotate-0 transition-all", showFilter && "rotate-180"]}
      alt="chevron-down"
    />
  </button>
  {#if showFilter}
    <FilterCards />
  {/if}
</div>
