import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/assets/images/logo-furniro.png";

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";

export default function HeaderAdmin() {
  const session = useSession();
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/auth/login",
    });
  };
  return (
    <div>
      <div className="tw-sticky tw-top-0 tw-z-30 tw-flex tw-items-center tw-justify-between tw-border-b tw-border-default-100 tw-bg-white tw-p-4">
        <Link href="/">
          <Image src={Logo} width={152} alt="log-furniro" />
        </Link>

        <Box className="tw-flex tw-items-center tw-gap-2">
          <Typography>{session.data?.user.username}</Typography>
          <IconButton onClick={handleOpenMenu}>
            <Avatar>
              {session.data?.user.username?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          id="basic-menu"
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link href="/user/profile">
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
