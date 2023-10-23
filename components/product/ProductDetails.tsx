import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Similars from "$store/components/product/Similars.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import Installments from "./Installments.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import PrincipalImages from "$store/islands/PrincipalImages.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import ProductCta from "$store/islands/AddToCartButton/ProductCta.tsx";
import CTA from "$store/components/ui/CTA.tsx";
import ProductDescription from "$store/islands/ProductDescription.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

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

function ProductInfo({ page, layout }: { page: ProductDetailsPage } & Props) {
  const platform = usePlatform();
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;

  const {
    billingDuration: installmentsBillingDuration,
    billingIncrement: installmentsBillingIncrement,
  } = (offers?.offers[0].priceSpecification || [])
    .filter((item) => item.billingDuration !== undefined)
    .sort((a, b) => (b.billingDuration || 0) - (a.billingDuration || 0))
    .map(({ billingDuration, billingIncrement }) => ({
      billingDuration,
      billingIncrement,
    }))[0] || {};

  return (
    <>
      {/* Breadcrumb */}
      <div class="px-4">
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
      </div>

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
      <div class="mt-4 sm:mt-8 px-4">
        <div>
          {gtin && (
            <span class="text-sm text-base-300">
              Cod. {gtin}
            </span>
          )}
        </div>
        <h1>
          <span class="font-medium text-xl capitalize">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : product?.isVariantOf?.name}
          </span>
        </h1>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6 px-4">
        <ProductSelector product={product} />
      </div>
      {/* Similars */}
      <div class="flex flex-col gap-2 mt-4 px-4 md:max-w-[85%]">
        <span class="text-sm">
          Cores
        </span>

        <Similars
          products={product.isSimilarTo}
          type={layout?.similarsType ?? "slider"}
        />
      </div>
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
        <span class="font-medium text-sm">
          {formatPrice(price, offers!.priceCurrency!)} no <b>PIX</b>
        </span>
        <span class="flex">
          <Installments
            installmentsBillingDuration={installmentsBillingDuration ?? 0}
            installmentsBillingIncrement={installmentsBillingIncrement ?? 0}
            isPDP={true}
          />
        </span>
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-6 flex flex-col gap-2 px-4">
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
              {platform === "wake" && (
                <AddToCartButtonWake
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
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
          class="grid grid-cols-1 gap-4 sm:grid-cols-[max-content_40vw_40vw] sm:grid-rows-1 sm:justify-center"
        >
          {/* Image Slider */}
          <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
            <PrincipalImages images={images} />

            <Slider.PrevButton
              class="no-animation absolute left-0.5 top-1/2 btn btn-circle btn-outline z-30"
              disabled
            >
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>

            <Slider.NextButton
              class="no-animation absolute right-0.5 top-1/2 btn btn-circle btn-outline z-30"
              disabled={images.length < 2}
            >
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>

          {/* Dots */}
          <ul class="flex gap-2 sm:justify-start overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1">
            {images.map((img, index) => (
              <li class="min-w-[63px] sm:min-w-[100px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
                    class="group-disabled:border-base-300 border rounded "
                    width={63}
                    height={87.5}
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
        <div class="flex w-full h-full items-center justify-center mt-5 lg:mt-0 mb-3 gap-3 px-4">
          <div class="flex flex-col justify-between items-start gap-2 sm:gap-20 max-w-[1280px] w-full">
            <div class="flex flex-col gap-6 w-full lg:flex-1 lg:max-w-[30%]">
              {
                /* {props.page.product.isVariantOf!.additionalProperty?.filter(
                    (filteredItem) => filteredItem.name === "Cuidados",
                  ).length > 0 && (
                <div class="flex flex-col gap-3 w-full">
                  <h1 class="font-bold text-sm">Especificações</h1>

                  <div class="flex flex-col w-full gap-1 text-black">
                    {props.page.product.isVariantOf?.additionalProperty.filter(
                      (filteredItem) => filteredItem.name === "Cuidados",
                    ).map((item) => (
                      <div class="even:bg-white odd:bg-gray-100 grid grid-cols-2 w-full px-6 py-1">
                        <span class="font-semibold text-sm">{item.name}</span>

                        {item.value && (
                          <span class="text-sm">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )} */
              }

              <div class="flex flex-col gap-3 w-full">
                <h1 class="font-bold text-sm">Medidas</h1>

                <div class="flex flex-col w-full gap-1 text-black">
                  {props?.page?.product?.isVariantOf?.additionalProperty
                    ?.filter(
                      (filteredItem) => filteredItem?.value?.includes("cm"),
                    ).map((item) => {
                      return (
                        <div class="even:bg-white odd:bg-gray-100 flex gap-2 w-full xl:w-[90%] px-6 py-1">
                          <span class="font-semibold text-sm min-w-[30%]">
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
            </div>

            {props?.page?.product?.description && (
              <ProductDescription
                description={props.page.product.description}
              />
            )}
          </div>
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
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
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

function ProductDetails({ page, layout }: Props) {
  return (
    <div class="container pt-20 sm:pt-36 lg:pt-28 lg:pb-10">
      {page ? <Details page={page} layout={layout} /> : <NotFound />}
    </div>
  );
}

export default ProductDetails;
