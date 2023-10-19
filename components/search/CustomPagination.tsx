import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  pageInfo: {
    currentPage: number;
    nextPage?: string;
    previousPage?: string;
    records?: number;
    recordPerPage?: number;
  };
}

function generatePageLinks(pageInfo: Props["pageInfo"]) {
  if (!pageInfo.records || !pageInfo.recordPerPage) return [];

  const pageFormated = pageInfo.nextPage
    ? pageInfo.nextPage.split("page=")[0]
    : "?";

  const totalPages = Math.ceil(pageInfo.records / pageInfo.recordPerPage);

  const links = Array.from({ length: totalPages }, (_, i) => i + 1).map((
    i,
  ) => ({
    label: i,
    href: `${pageFormated}page=${i}`,
    show: i < 5 && pageInfo.currentPage < 4
      ? true
      : i > pageInfo.currentPage - 3 && i < pageInfo.currentPage + 2
      ? true
      : false,
  }));

  return links;
}

export default function PaginationCustom({ pageInfo }: Props) {
  const pageLinks = generatePageLinks(pageInfo);

  if (pageLinks.length === 0) return null;

  return (
    <div class="flex justify-center my-4">
      <div class="flex items-center">
        <a
          aria-label="previous page link"
          rel="prev"
          href={pageInfo.previousPage ?? "#"}
          disabled={!pageInfo.previousPage}
          class={`mr-1 ${
            pageInfo.currentPage === 1 ? "hidden" : "flex"
          } items-center justify-center text-neutral-800 w-8 h-8 hover:bg-white rounded-[5px] border border-solid border-[#EAEAEA] hover:border-black disabled:cursor-not-allowed disabled:opacity-70`}
        >
          <Icon id="ChevronLeft" size={20} strokeWidth={1} />
        </a>
        <div class="flex items-center">
          {pageLinks.map((item) => (
            <a
              class={`${
                pageInfo.currentPage === item.label
                  ? "bg-dark-pink text-white border-dark-pink"
                  : "bg-white text-neutral-800 border-[#EAEAEA] hover:border-black"
              } ${
                item.show ? "flex" : "hidden"
              } w-8 h-8 border justify-center items-center mx-[5px] my-0 rounded-[5px] border-solid text-sm font-normal leading-6`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          aria-label="next page link"
          rel="next"
          href={pageInfo.nextPage ?? "#"}
          disabled={!pageInfo.nextPage}
          class="ml-1 flex items-center justify-center text-neutral-800 w-8 h-8 hover:bg-white rounded-[5px] border border-solid border-[#EAEAEA] hover:border-black disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Icon id="ChevronRight" size={20} strokeWidth={1} />
        </a>
      </div>
    </div>
  );
}
