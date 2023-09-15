import { signal } from "@preact/signals";

const selectedSku = signal<string | null>(null);
const setSku = (sku: string | null) => selectedSku.value = sku;

const state = {
  selectedSku,
  setSku,
};

export const useSkuSelector = () => state;
