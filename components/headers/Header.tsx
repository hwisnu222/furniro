import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";

import {
  IconButton,
  Drawer,
  Divider,
  Button,
  Stack,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  SearchOutlined,
  CloseOutlined,
  HighlightOffOutlined,
  Menu,
  LocalMall,
  Call,
  Home,
  Person,
  Favorite,
  ShoppingCart,
  PermIdentityOutlined,
  FavoriteOutlined,
  ShoppingCartOutlined,
  Close,
} from "@mui/icons-material";

// images
import Logo from "@/assets/images/logo-furniro.png";
import FunirtureImg from "@/assets/images/furniture.png";
import { GET_CARTS } from "@/graphql/queries/cart.query";
import { CartItem } from "@/interfaces/cart.interface";
import { convertCurrency } from "@/utils/currency";
import { DELETE_CART } from "@/graphql/mutations/cart.mutation";
import { getTotalPrice } from "@/utils/cart/getTotalCart";
import { ROLE, STATUS_AUTH } from "@/constants";

const AuthComponent = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  if (session) {
    return children;
  }
  return null;
};

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawer, setDrawer] = React.useState<boolean>(false);
  const [menuMobile, setMenuMobile] = React.useState<boolean>(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const session = useSession();

  const [deleteCart] = useMutation(DELETE_CART, {
    onCompleted: () => {
      enqueueSnackbar("Cart is delete", { variant: "success" });
      refetch();
    },
    onError: () => {
      enqueueSnackbar("failed delete cart", { variant: "error" });
    },
  });

  const { data, refetch } = useQuery(GET_CARTS, {
    variables: {
      filters: {
        users_permissions_user: {
          id: {
            eq: session.data?.user.id,
          },
        },
      },
    },
    fetchPolicy: "cache-and-network",
  });
  const carts = data?.carts.data;

  const handleDrawer = () => {
    setDrawer((prev: boolean) => !prev);
  };

  const handleMenuMobile = () => {
    setMenuMobile((prev: boolean) => !prev);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    router.replace(`/shop?search=${search}`);
    setSearch(event.target.value as string);
  };

  const resetSearchParams = () => {
    setSearch("");
    router.replace("/shop");
    handleShowSearch();
  };

  const handleShowSearch = () => {
    setShowSearch((prev: boolean) => !prev);
  };

  const handleEnterSearch = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      handleShowSearch();
    }
  };

  const handleDeleteCart = (id: number) => {
    deleteCart({
      variables: {
        id,
      },
    });
  };
  console.log(session.data?.user.role);
  const pathAccounst =
    session.data?.user.role === ROLE.Admin
      ? "/admin/product/list"
      : "/user/transaction";
  return (
    <>
      <div className="tw-sticky tw-top-0 tw-z-30 tw-hidden tw-items-center tw-justify-around tw-bg-white tw-p-4 md:tw-flex">
        <h3>
          <Link href="/">
            <Image src={Logo} width={152} alt="log-furniro" />
          </Link>
        </h3>
        <ul className="tw-green-400 tw-flex tw-gap-8 tw-font-medium">
          <li className="hover:tw-text-gray-500">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:tw-text-gray-500">
            <Link href="/shop">Shop</Link>
          </li>
          <li className="hover:tw-text-gray-500">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        {session.status === STATUS_AUTH.authenticated ? (
          <ul className="tw-flex tw-gap-4">
            <Link href={pathAccounst}>
              <li>
                <IconButton>
                  <PermIdentityOutlined />
                </IconButton>
              </li>
            </Link>

            <li>
              {showSearch ? (
                <TextField
                  size="small"
                  className="tw-w-full"
                  autoFocus
                  onChange={handleSearch}
                  onKeyDown={handleEnterSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {searchParams.get("search") ? (
                          <IconButton onClick={resetSearchParams}>
                            <Close className="tw-cursor-pointer" />
                          </IconButton>
                        ) : (
                          <SearchOutlined className="tw-cursor-pointer" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <IconButton onClick={handleShowSearch}>
                  <SearchOutlined />
                </IconButton>
              )}
            </li>
            <AuthComponent>
              <li>
                <IconButton component={Link} href="/user/wishlist">
                  <FavoriteOutlined />
                </IconButton>
              </li>
              <li>
                <IconButton onClick={handleDrawer}>
                  <ShoppingCartOutlined />
                </IconButton>
              </li>
            </AuthComponent>
          </ul>
        ) : (
          <Stack gap={2} direction="row">
            <Button
              variant="contained"
              className="tw-bg-default-200"
              component={Link}
              href="/auth/login"
              target="_blank"
            >
              Login
            </Button>
            <Button
              variant="outlined"
              component={Link}
              href="/auth/register"
              target="_blank"
            >
              Register
            </Button>
          </Stack>
        )}
      </div>

      {/* drawer */}
      <Drawer anchor="right" open={drawer} onClose={handleDrawer}>
        <div className="tw-items-between tw-flex tw-h-full tw-flex-col tw-p-4">
          <div>
            <div className="tw-flex tw-items-center tw-justify-between tw-px-2 tw-py-4">
              <h3 className="tw-text-xl tw-font-bold">Shooping Cart</h3>
              <IconButton onClick={handleDrawer}>
                <CloseOutlined />
              </IconButton>
            </div>
            <Divider className="tw-mb-4" />

            {carts?.map((cart: CartItem, index: number) => (
              <div className="tw-flex tw-gap-4" key={`cart-${index}`}>
                <Image
                  src={FunirtureImg}
                  alt="cart-shop"
                  fill={false}
                  className="tw-h-20 tw-w-20 tw-rounded-md"
                />
                <div className="tw-flex tw-items-center tw-justify-between tw-gap-2">
                  <div>
                    <h3>{cart.attributes.product?.data?.attributes.name}</h3>
                    <p className="tw-text-xs">
                      {cart.attributes.total} x{" "}
                      <span className="tw-ml-2 tw-text-default-200">
                        {convertCurrency(
                          cart.attributes.total *
                            cart.attributes.product?.data?.attributes.price,
                        )}
                      </span>
                    </p>
                  </div>
                  <IconButton>
                    <HighlightOffOutlined
                      onClick={() => handleDeleteCart(cart.id)}
                    />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          <div className="tw-mt-auto">
            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
              <p>Subtotal</p>
              <p className="tw-font-bold tw-text-default-200">
                {convertCurrency(getTotalPrice(carts))}
              </p>
            </div>
            <Stack direction="row" justifyContent="space-between">
              <Button
                component={Link}
                href="/cart"
                variant="outlined"
                size="small"
                className="tw-rounded-full"
              >
                Cart
              </Button>
              <Button
                component={Link}
                href="/checkout"
                variant="outlined"
                size="small"
                className="tw-rounded-full"
              >
                Checkout
              </Button>
              <Button
                component={Link}
                href="/comparition"
                variant="outlined"
                size="small"
                className="tw-rounded-full"
              >
                Comparition
              </Button>
            </Stack>
          </div>
        </div>
      </Drawer>

      {/* Mobile */}

      <div className="tw-sticky tw-top-0 tw-z-30 tw-flex tw-items-center tw-justify-between tw-bg-white tw-p-4 md:tw-hidden">
        <span></span>
        <Link href="/">
          <Image src={Logo} width={152} alt="log-furniro" />
        </Link>
        <Menu onClick={handleMenuMobile} className="tw-cursor-pointer" />
        <Drawer anchor="right" open={menuMobile} onClose={handleMenuMobile}>
          <div className="tw-flex tw-items-center tw-justify-between tw-px-2 tw-py-4">
            <h3 className="tw-text-xl tw-font-bold">Menu</h3>
            <IconButton onClick={handleMenuMobile} className="tw-ml-24">
              <CloseOutlined />
            </IconButton>
          </div>

          <List>
            <ListItemButton component={Link} href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} href="/shop">
              <ListItemIcon>
                <LocalMall />
              </ListItemIcon>
              <ListItemText primary="Shop" />
            </ListItemButton>
            <ListItemButton component={Link} href="/contact">
              <ListItemIcon>
                <Call />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>

            <Divider className="tw-my-4" />
            <h3 className="tw-p-4 tw-text-sm tw-font-bold tw-text-gray-400">
              Account
            </h3>

            <ListItemButton component={Link} href="/user/transaction">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SearchOutlined />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
            <ListItemButton component={Link} href="/user/wishlist">
              <ListItemIcon>
                <Favorite />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
            <ListItemButton onClick={handleDrawer}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>
          </List>
        </Drawer>
      </div>
    </>
  );
}
