export const convertCurrency = (number: number) => {
  const c = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return c.format(number);
};
