import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Similars from "$store/components/product/Similars.tsx";
import Installments from "./Installments.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import PrincipalImages from "$store/islands/PrincipalImages.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import ProductCta from "$store/islands/AddToCartButton/ProductCta.tsx";
import CTA from "$store/components/ui/CTA.tsx";
import Matcher from "$store/components/product/Matcher.tsx";
import DiscountPercentage from "$store/components/product/DiscountPercentage.tsx";
import ProductDescription from "$store/components/product/ProductDescription.tsx";
import PaymentsDetails from "$store/components/product/PaymentsDetails.tsx";
import ProductGift from "./ProductGift.tsx";
import ShareButton from "deco-sites/cristaistavares/components/ui/ShareButton.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  suggestions: Product[] | null;
  /**
   * @ignore
   */
  productGift?: {
    name: string;
    imageUrl: string;
  };

  layout?: {
    /**
     * @title Product Image
     * @description How the main product image will be displayed
     * @default slider
     */
    image?: "front-back" | "slider";
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
    /**
     * @title Similars Product Layout
     * @description the most performant way to use it is the Slider type, but we have the common variation, present on the website in production.
     */
    similarsType?: "slider" | "normal";
  };
}

const WIDTH = 360;
const HEIGHT = 360;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo(
  { page, layout, productGift, suggestions }:
    & { page: ProductDetailsPage }
    & Props,
) {
  const platform = usePlatform();
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    productID,
    offers,
    name = "",
    isVariantOf,
    additionalProperty = [],
  } = product;
  const {
    price: offerPrice = 0,
    listPrice,
    seller = "1",
    availability,
    giftSkuIds,
  } = useOffer(offers);
  const price =
    product?.offers?.offers[0]?.priceSpecification?.find((item) =>
      item.priceType == "https://schema.org/SalePrice"
    )?.price ?? offerPrice;
  const pixPrice =
    product?.offers?.offers[0]?.priceSpecification?.find((item) =>
      item.name === "Pix"
    )?.price ?? 0;
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;
  const refId =
    additionalProperty?.find((item) => item.name == "RefId")?.value ?? "";

  const {
    billingDuration: installmentsBillingDuration,
    billingIncrement: installmentsBillingIncrement,
  } = (offers?.offers?.[0]?.priceSpecification || [])
    .filter((item) => item.billingDuration !== undefined)
    .sort((a, b) => (b.billingDuration || 0) - (a.billingDuration || 0))
    .map(({ billingDuration, billingIncrement }) => ({
      billingDuration,
      billingIncrement,
    }))[0] || {};

  return (
    <>
      <CTA
        listPrice={listPrice}
        price={price}
        offers={product.offers}
        name={product.name}
        productGroupId={product.isVariantOf?.productGroupID ?? ""}
        skuId={product.sku}
        sellerId={seller!}
      />

      {/* Code and name */}
      <div class="px-4">
        <h1>
          <span class="font-semibold text-xl capitalize">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : product?.isVariantOf?.name}
          </span>
        </h1>

        <div class="flex flex-col gap-2 mt-2">
          <div class="flex items-center justify-between w-[90%]">
            {refId && (
              <span class="text-sm">
                Cod. {refId}
              </span>
            )}

            <ShareButton />
          </div>

          <div class="konfidency-reviews-summary" data-sku={productGroupID}>
          </div>
        </div>
      </div>
      {/* Sku Selector */}
      <ProductSelector product={product} />
      {/* Similars */}
      {product.isSimilarTo && product.isSimilarTo.length > 0 && (
        <div class="flex flex-col gap-2 mt-4 px-4 max-w-full">
          <span class="text-sm">
            Cores
          </span>

          <Similars
            products={product.isSimilarTo}
            type={layout?.similarsType ?? "slider"}
          />
        </div>
      )}
      {/* Prices */}
      <div class="flex flex-col mt-4 gap-2 px-4">
        <div class="flex flex-row gap-2 items-center">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-sm">
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </span>
          )}
          <span class="font-medium text-sm">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
        <span class="font-medium text-xl text-emerald-500">
          {formatPrice(pixPrice, offers!.priceCurrency!)} no <b>PIX</b>
        </span>
        <span class="flex">
          <Installments
            installmentsBillingDuration={installmentsBillingDuration ?? 0}
            installmentsBillingIncrement={installmentsBillingIncrement ?? 0}
            isPDP={true}
          />
        </span>

        <PaymentsDetails
          productPrice={price}
          pixPrice={pixPrice}
          priceCurrency={offers?.priceCurrency ?? "BRL"}
          ticketPrice={offers?.offers?.[0]?.priceSpecification?.find((item) =>
            item.name === "Boleto Bancário"
          )?.price ?? 0}
          cardsPrices={offers?.offers?.[0]?.priceSpecification?.filter((item) =>
            item.name == "PayPalPlus"
          )?.map((filteredItem) => {
            return {
              billingDuration: filteredItem?.billingDuration,
              billingIncrement: filteredItem?.billingIncrement,
            };
          }) ?? []}
        />
      </div>
      <div class="flex flex-col-reverse lg:flex-col">
        {giftSkuIds && giftSkuIds.length > 0 && (
          <div class="mt-4 sm:mt-6 px-4">
            <ProductGift productGift={productGift} />
          </div>
        )}
        <div class="lg:max-w-[510px]">
          {/* Add to Cart and Favorites button */}
          <div class="mt-4 sm:mt-6 flex gap-2 px-4">
            {availability === "https://schema.org/InStock"
              ? (
                <>
                  {platform === "vtex" && (
                    <>
                      <ProductCta
                        name={name}
                        productID={productID}
                        productGroupID={productGroupID}
                        price={price}
                        discount={discount}
                        seller={seller}
                        isPDP={true}
                      />
                      {
                        /* <WishlistButton
                        variant="full"
                        productID={productID}
                        productGroupID={productGroupID}
                      /> */
                      }
                    </>
                  )}
                </>
              )
              : <OutOfStock productID={productID} />}
          </div>

          {suggestions && suggestions.length > 0 && (
            <div class="mt-4 sm:mt-6 flex px-4 w-full">
              <a
                href="#combinacao"
                class="text-sm flex items-center justify-center w-full md:w-[80%] lg:w-[83%] border border-gray-500 hover:border-emerald-500 rounded hover:bg-emerald-500 hover:text-white h-[50px] transition-colors duration-200"
              >
                {suggestions?.[0]?.isVariantOf?.name?.includes("Abajur")
                  ? "Com Cúpula"
                  : "Sugestão de Composição"}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Shipping Simulation */}
      <div class="mt-8 px-4">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller,
            }]}
          />
        )}
      </div>
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

function Details(props: { page: ProductDetailsPage } & Props) {
  const id = useId();
  const { page: { product: { image: images = [] } }, layout } = props;
  const variant = layout?.image ?? "slider";

  const price = props?.page?.product?.offers?.offers[0]?.priceSpecification
    ?.find((
      item,
    ) => item.priceType == "https://schema.org/SalePrice")?.price;

  const listPrice = props?.page?.product?.offers?.offers[0]?.priceSpecification
    ?.find((
      item,
    ) => item.priceType == "https://schema.org/ListPrice")?.price;

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        <div
          id={id}
          class="grid grid-cols-1 gap-4 xl:gap-2 sm:grid-cols-[max-content_30vw_1fr] md:grid-cols-[max-content_30vw_52vw] xl:grid-cols-[100px_570px_545px] sm:grid-rows-1 sm:justify-center lg:px-4 2xl:px-0"
        >
          {/* Image Slider */}
          <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
            <DiscountPercentage
              price={price ?? 0}
              listPrice={listPrice ?? 0}
            />

            <PrincipalImages images={images} />

            <Slider.PrevButton
              class="no-animation absolute left-[1px] top-[35%] md:btn md:btn-circle md:btn-outline z-30 inline-flex"
              disabled
            >
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>

            <Slider.NextButton
              class="no-animation absolute right-[1px] top-[35%] md:btn md:btn-circle md:btn-outline rotate-180 z-30 inline-flex"
              disabled={images.length < 2}
            >
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.NextButton>
          </div>

          {/* Dots */}
          <ul class="flex gap-2 sm:justify-start overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1">
            {images.map((img, index) => (
              <li class="min-w-[63px] sm:min-w-[100px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
                    class="group-disabled:border-base-300 border rounded bg-no-repeat bg-center"
                    width={75}
                    height={75}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>

          {/* Product Info */}
          <div class="sm:pr-0 sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1">
            <ProductInfo {...props} />
          </div>
        </div>
        <SliderJS rootId={id} />
        <div class="flex flex-grow h-full items-center justify-center mt-5 lg:mt-0 mb-3 gap-3 px-4">
          <div class="flex flex-col justify-between items-start gap-6 sm:gap-12 max-w-[1240px] flex-grow">
            <div class="flex flex-col gap-6 flex-grow lg:flex-1 lg:max-w-[50%] w-full">
              {props?.page?.product?.isVariantOf?.additionalProperty &&
                props?.page?.product?.isVariantOf?.additionalProperty?.filter(
                    (item) => item?.value?.includes("cm"),
                  ).length > 0 &&
                (
                  <div class="flex flex-col gap-3 flex-grow w-full">
                    <h2 class="font-bold text-sm">Medidas</h2>

                    <div class="flex flex-col flex-grow gap-1 text-black w-full">
                      {props?.page?.product?.isVariantOf?.additionalProperty
                        ?.filter(
                          (filteredItem) => filteredItem?.value?.includes("cm"),
                        ).map((item) => {
                          return (
                            <div class="even:bg-white odd:bg-gray-100 flex gap-2 flex-grow xl:w-[90%] px-6 py-1">
                              <span class="font-semibold text-sm min-w-[30%] lg:min-w-[20%]">
                                {item?.name ?? ""}
                              </span>

                              <span class="text-sm w-full">
                                {item?.value ?? ""}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
            </div>

            {props?.page?.product?.description && (
              <ProductDescription
                description={props.page.product.description}
              />
            )}
          </div>
        </div>

        <div class="flex-grow flex flex-col max-w-[1240px] mx-auto p-4 xl:p-0">
          {props.suggestions && props?.suggestions?.[0]?.name && (
            <div id="combinacao" class="mt-4 sm:mt-6 px-4 lg:px-0">
              <h2
                class={"text-center md:text-start border-b border-lavender mb-8 py-3 text-2xl"}
              >
                Combinação perfeita
              </h2>
              <Matcher
                product={props.page.product}
                suggestions={props.suggestions}
              />
            </div>
          )}
        </div>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: 1 }}
              src={img.url!}
              alt={img.alternateName}
              width={126}
              height={175}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo {...props} />
      </div>
    </div>
  );
}

function ProductDetails(
  { page, layout, productGift, suggestions }: Props,
) {
  return (
    <div class="xl:container pt-12">
      {page
        ? (
          <>
            {/* Breadcrumb */}
            <div class="xl:max-w-[1220px] mx-auto px-6 lg:px-10 xl:px-0 mb-2">
              <Breadcrumb
                itemListElement={page.breadcrumbList?.itemListElement.slice(
                  0,
                  -1,
                )}
              />
            </div>

            <Details
              page={page}
              layout={layout}
              suggestions={suggestions}
              productGift={productGift}
            />
          </>
        )
        : <NotFound />}
    </div>
  );
}

// export const loader = async (props: Props) => {
//   const giftSkuIds = props.page?.product?.offers?.offers[0].giftSkuIds;

//   if (!giftSkuIds || giftSkuIds.length === 0) return props;

//   const data = await fetch(
//     `https://cristaistavares.myvtex.com/api/catalog_system/pub/products/search/?skuid=${
//       giftSkuIds[0]
//     }`,
//   ).then((response) => response.json());

//   if (data && data[0] && data[0].items) {
//     return {
//       ...props,
//       productGift: {
//         name: data[0].productName || "",
//         imageUrl: data[0].items[0].images[0]?.imageUrl || "",
//       },
//     };
//   }

//   return props;
// };

export default ProductDetails;
