<script lang="ts">
  import { labels } from "../labels";
  import { selectedCommander } from "../stores/common";
</script>

<p class="text-2xl mb-2">{labels.selectedCommander}</p>
<div class="margin-auto w-full flex justify-center items-center">
  {#if $selectedCommander}
    <div class="flex items-center justify-center flex-col relative">
      <img
        src={$selectedCommander.image_uris.large}
        alt="commander"
        class="h-[20.875rem] w-60"
        loading="lazy"
      />
      <button
        class="absolute top-0 left-0 p-1 m-1 px-2 bg-slate-800 opacity-60 text-white rounded-full"
        on:click={() => selectedCommander.set(undefined)}
      >
        X
      </button>
      <h1 class="text-2xl mt-2">{$selectedCommander.name}</h1>
    </div>
  {:else}
    <div class="animate-pulse h-[20.875rem] w-60 bg-slate-200"></div>
  {/if}
</div>
