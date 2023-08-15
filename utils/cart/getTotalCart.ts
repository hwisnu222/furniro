/**
 *
 * @param carts {CartItem}
 * @returns number
 */

import { CartItem } from "@/interfaces/cart.interface";

export const getTotalPrice = (carts: CartItem[]) => {
  const total = carts?.reduce((prev: number, current: any) => {
    const sumPrice =
      current.attributes.total *
      current.attributes.product?.data?.attributes.price;
    return prev + sumPrice;
  }, 0);

  return total;
};
