import type { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export default function Reviews({ page }: Props) {
  if (!page || !page.product) return null;

  return (
    <>
      <script
        type="module"
        src="https://reviews.konfidency.com.br/cristaistavares/loader.js"
      />

      <div class="konfidency-reviews-details"></div>
    </>
  );
}
