/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const selectedSku = signal<string | null>(null);
const setSku = (sku: string | null) => selectedSku.value = sku;

const state = {
  selectedSku,
  setSku,
};

export const useSkuSelector = () => state;
