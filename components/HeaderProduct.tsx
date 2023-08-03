import React from "react";
import { Breadcrumbs, Typography, Link } from "@mui/material";

import ShopBack from "../assets/images/shop-background.png";
import { HeaderProductProps, Path } from "@/interfaces/headerProduct.interface";

export default function HeaderProduct(props: HeaderProductProps) {
  return (
    <div
      className="tw-flex tw-h-[300px] tw-w-full tw-flex-col tw-items-center tw-justify-center"
      style={{
        backgroundImage: `url(${ShopBack.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h3 className="tw-text-3xl tw-font-semibold">{props.title}</h3>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" href="/">
          <Typography color="text.primary">Home</Typography>
        </Link>
        {props.paths.map((path: Path, index: number) => (
          <Link
            underline="hover"
            color="inherit"
            key={`path-${index}`}
            href={path.url || "/"}
          >
            {path.label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
