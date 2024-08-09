import type { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export default function Reviews({ page }: Props) {
  if (!page || !page.product) return null;

  return (
    <>
      <script
        async
        src="https://reviews.konfidency.com.br/cristaistavares/loader.js"
      />

      <div class="px-4 max-w-7xl mx-auto">
        <div class="konfidency-reviews-details"></div>
      </div>
    </>
  );
}
