import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/assets/images/logo-furniro.png";

import { Avatar } from "@mui/material";

export default function HeaderAdmin() {
  return (
    <div>
      <div className="tw-sticky tw-top-0 tw-z-30 tw-hidden tw-items-center tw-justify-between tw-border-b tw-border-default-100 tw-bg-white tw-p-4 md:tw-flex">
        <Link href="/">
          <Image src={Logo} width={152} alt="log-furniro" />
        </Link>

        <Avatar>Menu</Avatar>
      </div>
    </div>
  );
}
