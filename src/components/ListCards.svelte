<script lang="ts">
  import { get } from "svelte/store";
  import { getGroqChatResponse } from "../ai/groq";
  import { filterType, selectedCommander } from "../stores/common";
  import type { FilterType, MagicCard } from "../types/commander";
  import { BaseUrl, fetchApi } from "../utils/fetch";
  import { labels } from "../labels";

  let chatCompletion: MagicCard[] = [];
  let loading = false;

  const fetchCards = async (
    commander?: MagicCard,
    extra?: boolean,
    filter?: FilterType
  ) => {
    if (commander) {
      loading = true;
      const groqData = await fetchApi<{ data: MagicCard[] }>(`cardAi`, {
        method: "POST",
        baseurl: BaseUrl.Groq,
        body: JSON.stringify({
          commander: commander,
          filter: filter,
          chatCompletion: extra ? chatCompletion.map((item) => item.name) : [],
        }),
      });
      if (groqData.data) {
        fetchApi<{ data: MagicCard[] }>(`cards/collection`, {
          body: JSON.stringify({
            identifiers: groqData.data,
          }),
          baseurl: BaseUrl.Scryfall,
          method: "POST",
        })
          .then((value) => {
            let mtgCards = value.data;
            if (filter) {
              mtgCards = mtgCards.filter((item) => {
                if (filter.cardType) {
                  return item.type_line.includes(filter.cardType);
                }
                if ((filter.cardColor?.length || 0) > 0) {
                  return item.colors?.every((color) =>
                    filter.cardColor?.includes(color)
                  );
                } else if (commander.colors.length > 0) {
                  return item.colors.every((color) =>
                    commander.colors.includes(color)
                  );
                }
                return true;
              });
            }
            mtgCards = mtgCards.map((item) => {
              const selectedItem = groqData.data.find(
                (groqItem: MagicCard) => groqItem.name === item.name
              );
              return {
                ...item,
                explanation: selectedItem?.explanation || "",
              };
            });
            if (extra) {
              chatCompletion = [...chatCompletion, ...mtgCards];
            } else {
              chatCompletion = mtgCards;
            }
          })
          .finally(() => {
            loading = false;
          });
      }
    }
  };

  $: {
    const commander = $selectedCommander;
    const filter = $filterType;
    if (commander) {
      fetchCards(commander, false, filter);
    }
  }
</script>

{#if chatCompletion.length > 0}
  <hr class="py-10 border-t-2 border-gray-300 w-full" />
  <p class="text-center text-2xl font-bold">Results</p>
{/if}

<div class="pt-20 flex items-start flex-wrap">
  {#each chatCompletion as completion}
    <div class="flex items-center flex-col justify-start w-1/3 py-4">
      <img
        src={completion.image_uris.large}
        class="h-[20.875rem] w-60"
        alt={completion.name}
      />
      <p class="text-xl font-bold">{completion.name}</p>
      <p class="text-sm text-gray-600 w-60">{completion.explanation}</p>
    </div>
  {/each}
</div>
{#if loading}
  <div class="py-4">
    <img src="/loading.svg" class="w-6 h-6 m-auto" alt="loading" />
  </div>
{/if}
{#if chatCompletion.length > 1}
  <button
    class="bg-slate-800 text-white p-6 my-6 rounded-md mt-10"
    on:click={() => fetchCards(get(selectedCommander), true, $filterType)}
  >
    {labels.loadMore}
  </button>
{/if}
