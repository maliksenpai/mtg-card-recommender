import { writable } from "svelte/store";
import type { FilterType, MagicCard } from "../types/commander";

export const selectedCommander = writable<MagicCard | undefined>(undefined);
export const filterType = writable<FilterType>({});