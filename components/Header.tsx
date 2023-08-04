import React from "react";
import Image from "next/image";
import Link from "next/link";

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
} from "@mui/material";
import {
  PermIdentityOutlined,
  SearchOutlined,
  FavoriteOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  HighlightOffOutlined,
  Menu,
  LocalMall,
  Info,
  Call,
  Home,
  Person,
  Favorite,
  ShoppingCart,
} from "@mui/icons-material";

// images
import Logo from "../assets/images/logo-furniro.png";
import FunirtureImg from "../assets/images/furniture.png";

export default function Header() {
  const [drawer, setDrawer] = React.useState<boolean>(false);
  const [menuMobile, setMenuMobile] = React.useState<boolean>(false);

  const handleDrawer = () => {
    setDrawer((prev: boolean) => !prev);
  };

  const handleMenuMobile = () => {
    setMenuMobile((prev: boolean) => !prev);
  };

  return (
    <>
      <div className="tw-sticky tw-top-0 tw-z-30 tw-hidden tw-items-center tw-justify-around tw-bg-white tw-p-4 md:tw-flex">
        <h3>
          <Image src={Logo} width={152} alt="log-furniro" />
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
        {/* <ul className="tw-flex tw-gap-4">
          <li>
            <IconButton>
              <PermIdentityOutlined />
            </IconButton>
          </li>
          <li>
            <IconButton>
              <SearchOutlined />
            </IconButton>
          </li>
          <li>
            <IconButton>
              <FavoriteOutlined />
            </IconButton>
          </li>
          <li>
            <IconButton onClick={handleDrawer}>
              <ShoppingCartOutlined />
            </IconButton>
          </li>
        </ul> */}
        <Stack gap={2} direction="row">
          <Button
            variant="contained"
            className="tw-bg-default-200"
            component={Link}
            href="/auth/login"
          >
            Login
          </Button>
          <Button variant="outlined">Register</Button>
        </Stack>
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

            <div className="tw-flex tw-gap-8">
              <Image
                src={FunirtureImg}
                alt="cart-shop"
                fill={false}
                className="tw-h-20 tw-w-20 tw-rounded-md"
              />
              <div className="tw-flex tw-items-center tw-gap-4">
                <div>
                  <h3>furniture Product</h3>
                  <p className="tw-text-sm">
                    1 x{" "}
                    <span className="tw-ml-2 tw-text-default-200">
                      Rp.25.000.000
                    </span>
                  </p>
                </div>
                <IconButton>
                  <HighlightOffOutlined />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="tw-mt-auto">
            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
              <p>Subtotal</p>
              <p className="tw-font-bold tw-text-default-200">Rp 25.000.000</p>
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
        <Image src={Logo} width={152} alt="log-furniro" />
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

            <ListItemButton component={Link} href="/contact">
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
            <ListItemButton component={Link} href="/wishlist">
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
