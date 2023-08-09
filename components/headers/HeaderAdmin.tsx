import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/assets/images/logo-furniro.png";

import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";

export default function HeaderAdmin() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchor(null);
  };
  return (
    <div>
      <div className="tw-sticky tw-top-0 tw-z-30 tw-flex tw-items-center tw-justify-between tw-border-b tw-border-default-100 tw-bg-white tw-p-4">
        <Link href="/">
          <Image src={Logo} width={152} alt="log-furniro" />
        </Link>

        <IconButton onClick={handleOpenMenu}>
          <Avatar>A</Avatar>
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
