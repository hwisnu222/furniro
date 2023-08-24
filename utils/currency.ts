/**
 *
 * @param number {number}
 * @returns string
 */

export const convertCurrency = (number: number) => {
  const c = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return c.format(number);
};
