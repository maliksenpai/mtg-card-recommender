<script lang="ts">
  import { labels } from "../labels";
  import { selectedCommander } from "../stores/common";
  import type { MagicCard } from "../types/commander";
  import { debounce } from "../utils/debounce";
  import { BaseUrl, fetchApi } from "../utils/fetch";

  let query = "";
  let results: MagicCard[] = [];
  let loading = false;
  let focused = true;

  const fetchResults = async (query: string) => {
    if (query.length > 2) {
      loading = true;
      const response = await fetchApi<{ data: MagicCard[] }>(`cards/search`, {
        query: { q: query },
        cardType: "legendary creature",
        method: "GET",
        baseurl: BaseUrl.Scryfall,
      });
      results = response.data;
      loading = false;
    }
  };

  const selectCommander = (commander: MagicCard) => {
    query = commander.name;
    results = [];
    selectedCommander.set(commander);
  };

  const debouncedFetchResults = debounce(fetchResults, 1000);

  $: debouncedFetchResults(query);
</script>

<div class="relative w-full flex justify-center items-center pb-10">
  <input
    type="text"
    class="w-[90%] md:w-[45%] p-2 mt-10 bg-white"
    placeholder={labels.commanderInput}
    bind:value={query}
    on:focus={() => (focused = true)}
    on:blur={() => setTimeout(() => (focused = false), 200)}
  />

  {#if focused}
    <div
      class="absolute top-20 w-[90%] md:w-[45%] max-h-52 overflow-auto bg-white shadow-lg"
    >
      {#if loading}
        <div class="py-4">
          <img
            src={`${import.meta.env.BASE_URL}/loading.svg`}
            class="w-6 h-6 m-auto"
            alt="loading"
            loading="lazy"
          />
        </div>
      {:else}
        <ul>
          {#each results as result}
            <button
              on:click={() => selectCommander(result)}
              class="hover:bg-gray-200 cursor-pointer py-2 w-full text-left h-full"
            >
              {result.name}
            </button>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>
