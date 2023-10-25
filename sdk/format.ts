const formatters = new Map<string, Intl.NumberFormat>();

const formatter = (currency: string, locale: string) => {
  const key = `${currency}::${locale}`;

  if (!formatters.has(key)) {
    formatters.set(
      key,
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }),
    );
  }

  return formatters.get(key)!;
};

export const formatPriceWithoutCents = (
  price: number | undefined,
  currency = "BRL",
  locale = "pt-BR",
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (!price) {
    return null;
  }

  return formatter.format(price);
};

export const formatPrice = (
  price: number | undefined,
  currency = "BRL",
  locale = "pt-BR",
) => price ? formatter(currency, locale).format(price) : null;
