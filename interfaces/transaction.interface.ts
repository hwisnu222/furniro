import { CartItem } from "./cart.interface";
import { ItemProduct } from "./product.interface";
import { UsersPermissionsUserItem } from "./usersPermissionsUser.interface";

export interface TransactionItem {
  id: number;
  attributes: {
    status: string;
    carts: {
      data: CartItem[];
    };
    users_permissions_user: {
      data: UsersPermissionsUserItem;
    };
    createdAt?: string;
    updatedAt?: string;
  };
}
