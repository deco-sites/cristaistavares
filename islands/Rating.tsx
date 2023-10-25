import { useEffect, useState } from "preact/compat";

interface Rating {
  average: number;
  totalCount: number;
}

export interface Props {
  productId?: string;
}

export default function Rating({ productId }: Props) {
  const [rating, setRating] = useState<Rating | null>(null);
  const API_URL =
    "https://cristaistavares.myvtex.com/reviews-and-ratings/api/rating/1168";

  useEffect(() => {
    async function getRating() {
      const data = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => response.json());

      console.log(data);
    }

    getRating();
  }, []);

  return (
    <div class="rating align-middle">
      <input
        type="radio"
        name="rating-1"
        aria-label="first star"
        class="mask mask-star-2 bg-yellow-300 w-4 cursor-default"
        checked={Math.floor(rating?.average ?? 0) == 1}
      />
      <input
        type="radio"
        name="rating-2"
        aria-label="second star"
        class="mask mask-star-2 bg-yellow-300 w-4 cursor-default"
        checked={Math.floor(rating?.average ?? 0) == 2}
      />
      <input
        type="radio"
        name="rating-3"
        aria-label="third star"
        class="mask mask-star-2 bg-yellow-300 w-4 cursor-default"
        checked={Math.floor(rating?.average ?? 0) == 3}
      />
      <input
        type="radio"
        name="rating-4"
        aria-label="fourth star"
        class="mask mask-star-2 bg-yellow-300 w-4 cursor-default"
        checked={Math.floor(rating?.average ?? 0) == 4}
      />
      <input
        type="radio"
        name="rating-5"
        aria-label="fifth star"
        class="mask mask-star-2 bg-yellow-300 w-4 cursor-default"
        checked={Math.floor(rating?.average ?? 0) === 5}
      />
    </div>
  );
}
