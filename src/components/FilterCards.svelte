<script lang="ts">
  import { labels } from "../labels";
  import { filterType, selectedCommander } from "../stores/common";
  import { AggresiveType } from "../types/commander";
  import { CARD_TYPES } from "../utils/consts";

  let selectedCardType = $state("");
  let selectedColors = $state<string[]>([]);
  let selectableColors = $state<(keyof typeof labels.Colors)[]>([
    "W",
    "U",
    "B",
    "R",
    "G",
  ]);
  let selectedAggresive = $state<AggresiveType>();

  const colorUrl = "https://svgs.scryfall.io/card-symbols/";

  const handleColorChange = (event: Event, color: string) => {
    const target = event.target as HTMLInputElement;
    selectedColors = target.checked
      ? [...selectedColors, color]
      : selectedColors.filter((c) => c !== color);
    filterType.update((type) => {
      type.cardColor = selectedColors;
      return type;
    });
  };

  const handleChangeType = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    filterType.update((type) => {
      type.cardType = target.value;
      return type;
    });
  };

  const handleAggresiveChange = (type: AggresiveType) => {
    selectedAggresive = type;
    filterType.update((type) => {
      type.cardAggresive = selectedAggresive;
      return type;
    });
  };

  selectedCommander.subscribe((value) => {
    if (value) {
      selectableColors = value.colors as ("W" | "U" | "B" | "R" | "G")[];
      selectedColors = [];
    }
  });
</script>

<div class="flex flex-col gap-4 pt-2">
  <div class="filter-row">
    <label class="flex-2" for="cardType">{labels.CardType}</label>
    <select
      id="cardType"
      class="flex-8 mt-2 p-2 border rounded"
      bind:value={selectedCardType}
      oninput={handleChangeType}
    >
      {#each CARD_TYPES as cardType}
        <option value={cardType}>{cardType}</option>
      {/each}
    </select>
  </div>
  <div class="filter-row">
    <label class="flex-2" for="cardColor">{labels.CardColor}</label>
    <div id="cardColor" class="flex flex-row flex-8 md:mt-2 flex-wrap">
      {#each selectableColors as color}
        <div class="flex items-center mb-2 mx-2">
          <input
            type="checkbox"
            class="accent-blue-400"
            id={color}
            value={color}
            onchange={(e) => handleColorChange(e, color)}
          />
          <label for={color} class="ml-2 flex item-center justify-center gap-1">
            <img
              src={`${colorUrl}${color}.svg`}
              alt={color}
              class="w-4 h-4 mt-1"
              loading="lazy"
            />
            {labels.Colors[color]}
          </label>
        </div>
      {/each}
    </div>
  </div>

  <div class="filter-row">
    <label class="flex-2" for="cardAggresive">{labels.CardAggresive}</label>
    <div id="cardAggresive" class="flex flex-row flex-8 md:mt-2 flex-wrap">
      {#each Object.values(AggresiveType) as type}
        <div class="flex items-center mb-2 mx-2">
          <input
            type="checkbox"
            class="accent-blue-400"
            id={type}
            value={type}
            checked={selectedAggresive === type}
            onchange={() => handleAggresiveChange(type)}
          />
          <label for={type} class="ml-2 flex item-center justify-center gap-1">
            {type}
          </label>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  input[type="checkbox"] {
    width: 2rem;
    height: 2rem;
  }
  .filter-row {
    @apply flex ml-4 gap-4 md:gap-10 flex-col items-start md:flex-row md:items-center;
  }
</style>
