<script lang="ts">
  import "./app.css";
  import Filter from "./components/Filter.svelte";
  import { labels } from "./labels";
  import SelectedCommander from "./components/SelectedCommander.svelte";
  import ListCards from "./components/ListCards.svelte";
</script>

<main class="container min-w-[100vw] min-h-[100vh] bg-slate-100">
  <div class="text-center">
    <h1 class="gradient-text text-6xl font-boldt">{labels.title}</h1>
    <h3 class="mt-4 text-xl underline text-gray-500">{labels.subTitle}</h3>
  </div>
  <div class="flex flex-col items-center min-h-[inherit] mt-10">
    <SelectedCommander />
    <Filter />
    <ListCards />
  </div>
</main>

<style>
  .gradient-text {
    background: linear-gradient(90deg, #e3342f, #3490dc, #e3342f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-x 3s ease infinite;
  }

  @keyframes gradient-x {
    0%,
    100% {
      background-size: 200% 200%;
      background-position: left center;
    }
    50% {
      background-size: 200% 200%;
      background-position: right center;
    }
  }
</style>
