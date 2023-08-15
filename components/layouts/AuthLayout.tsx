import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/images/furniro-large.svg";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box className="tw-flex">
      <Box className="tw-hidden tw-h-screen tw-w-full tw-items-center tw-justify-center tw-border-r tw-border-default-200 tw-bg-default-100 md:tw-flex">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            fill={false}
            className="tw-h-16 tw-w-auto"
          />
        </Link>
      </Box>
      <Box className="tw-flex tw-h-screen tw-w-full tw-flex-col tw-items-center tw-justify-center">
        {children}
      </Box>
    </Box>
  );
}
