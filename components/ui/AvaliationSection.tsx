export interface Review {
  productId: string;
  rating: number;
  title: string;
  text: string;
  reviewerName: string;
  shopperId: string;
}

interface ReviewDataResponse {
  data: Review[];
}

export interface Rating {
  average: number;
  totalCount: number;
}

export interface Props {
  rating?: Rating | null;
  reviews?: Review[] | null;
}

function ReviewComment({ rating, reviewerName, text, title }: Review) {
  return (
    <div class="flex flex-col gap-1">
      <div class="rating align-middle gap-1">
        <input
          aria-label="star rating"
          readOnly={true}
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
          checked={Math.floor(rating) == 1}
        />
        <input
          aria-label="star rating"
          readOnly={true}
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
          checked={Math.floor(rating) == 2}
        />
        <input
          aria-label="star rating"
          readOnly={true}
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
          checked={Math.floor(rating) == 3}
        />
        <input
          aria-label="star rating"
          readOnly={true}
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
          checked={Math.floor(rating) == 4}
        />
        <input
          aria-label="star rating"
          readOnly={true}
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
          checked={Math.floor(rating) == 5}
        />
      </div>
      <span class="text-dark-pink font-semibold">{title}</span>
      <div class="flex items-center gap-2">
        <span>Comprador verificado</span>
        <span>
          Enviado por <b>{reviewerName}</b>
        </span>
      </div>
      <span>{text}</span>
    </div>
  );
}

export default function AvaliationSection({ rating, reviews }: Props) {
  if (!rating || !reviews || rating.totalCount == 0) return null;

  const RATING: Rating = {
    average: rating.average ?? 0,
    totalCount: rating.totalCount ?? 0,
  };

  return (
    <div class="flex w-full h-full items-center justify-center px-5 lg:px-0">
      <div class="flex items-center justify-center max-w-[1272px] w-full lg:px-4">
        <section class="flex flex-col items-center justify-center w-full">
          <div class="flex items-center justify-center">
            <h1 class="text-center text-[32px] leading-10 font-semibold pb-3 lg:pb-0">
              Avaliações
            </h1>
          </div>
          <div class="flex flex-col gap-1 align-middle items-start justify-start w-full">
            <div class="rating align-middle gap-1">
              <input
                aria-label="star rating"
                readOnly={true}
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
                checked={Math.floor(RATING.average) == 1}
              />
              <input
                aria-label="star rating"
                readOnly={true}
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
                checked={Math.floor(RATING.average) == 2}
              />
              <input
                aria-label="star rating"
                readOnly={true}
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
                checked={Math.floor(RATING.average) == 3}
              />
              <input
                aria-label="star rating"
                readOnly={true}
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
                checked={Math.floor(RATING.average) == 4}
              />
              <input
                aria-label="star rating"
                readOnly={true}
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
                checked={Math.floor(RATING.average) == 5}
              />
            </div>
            <div class="flex flex-col items-start justify-start mt-5 w-full">
              <div>
                <p class="text-sm">
                  Classificação média: {RATING.average} ({RATING.totalCount}
                  {" "}
                  avaliações)
                </p>
              </div>
              <div class="mt-10 pl-2">
                <a href="#">
                  <p class="text-sm underline">
                    Faça login para escrever uma avaliação
                  </p>
                </a>
              </div>
              <div class="flex flex-col sm:flex-row items-start justify-start gap-1.5 mt-7 mb-1.5">
                <select
                  aria-labelledby="open options selector"
                  class="text-sm border-2 rounded-md py-[0.25rem] px-[0.5rem] w-full"
                >
                  <option value="recentes">Mais Recentes</option>
                  <option value="antigas">Mais Antigas</option>
                  <option value="classAlta">Classificação Mais Alta</option>
                  <option value="classBaixa">Classificação Mais baixa</option>
                </select>
                <select
                  aria-labelledby="open options selector"
                  class="text-sm border-2 rounded-md py-[0.25rem] px-[0.5rem] w-full"
                >
                  <option value="todos">Todos</option>
                  <option value="1star">1 Estrela</option>
                  <option value="2star">2 Estrelas</option>
                  <option value="3star">3 Estrelas</option>
                  <option value="4star">4 Estrelas</option>
                  <option value="5star">5 Estrelas</option>
                </select>
              </div>
              <div class="flex items-start justify-start border-b-4 border-solid border-[#f2f4f5] min-w-full mb-5 py-3">
                {!reviews
                  ? (
                    <h1 class="text-start text-lg">
                      Nenhuma avaliação
                    </h1>
                  )
                  : (
                    <div class="flex flex-col gap-2.5">
                      {reviews?.map((review) => <ReviewComment {...review} />)}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export const loader = async (props: Props, req: Request) => {
  const url = new URL(req.url);
  const skuId = url.searchParams.get("skuId");

  if (!skuId) return null;

  const product = await fetch(
    `https://cristaistavares.myvtex.com/api/catalog_system/pub/products/search/?fq=skuId:${skuId}`,
  ).then((response) => response.json());

  if (!product) return null;

  const productId = product && product[0].productId;

  async function getRatingData(): Promise<Rating | null> {
    const data = await fetch(
      `https://cristaistavares.myvtex.com/reviews-and-ratings/api/rating/${productId}`,
    ).then((response) => response.json());

    return data;
  }

  async function getReviewData(): Promise<Review[] | null> {
    const reviewData: ReviewDataResponse = await fetch(
      `https://cristaistavares.myvtex.com/reviews-and-ratings/api/reviews`,
    ).then((response) => response.json());

    const reviews = reviewData.data.filter((item) =>
      item.productId == productId
    );

    return reviews;
  }

  const data = await Promise.all([getRatingData(), getReviewData()]).then((
    values,
  ) => values);

  return {
    ...props,
    rating: data[0],
    reviews: data[1],
  };
};
