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

/**
 *
 * @param cart {CartItem}
 * @returns number
 */

export const getSumProduct = (cart: CartItem) => {
  return cart.attributes.total * cart.attributes.product.data.attributes.price;
};
