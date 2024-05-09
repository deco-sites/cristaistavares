interface Props {
  installmentsBillingDuration: number | null;
  installmentsBillingIncrement: number | null;
  isPDP?: boolean;
}

const Installments = (
  { installmentsBillingDuration, installmentsBillingIncrement, isPDP = false }:
    Props,
) => {
  if (!installmentsBillingIncrement && !installmentsBillingDuration) {
    return null;
  }

  if (installmentsBillingDuration === 0 && installmentsBillingDuration === 0) {
    return null;
  }

  const formattedInstallmentsBillingIncrement = installmentsBillingIncrement
    ?.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  if (isPDP) {
    return (
      <div class="text-sm text-black tracking-tight lg:tracking-normal lg:text-base flex items-center justify-center gap-1">
        <span class="block">
          Em até <b>{installmentsBillingDuration}x</b> de{" "}
          <b>R$ {formattedInstallmentsBillingIncrement}</b> sem juros
        </span>
      </div>
    );
  }

  return (
    <div class="text-sm text-black tracking-tight lg:tracking-normal flex items-center justify-center gap-1">
      <span class="block">
        <b>{installmentsBillingDuration}x</b> de{" "}
        <b>R$ {formattedInstallmentsBillingIncrement}</b>
      </span>
    </div>
  );
};

export default Installments;
