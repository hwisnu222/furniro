import React from "react";
import Link from "next/link";
import { Button, Typography } from "@mui/material";

export default function Custom404() {
  return (
    <div className="tw-flex tw-min-h-screen tw-flex-col tw-items-center tw-justify-center">
      <Typography className=" tw-text-gray-400" variant="h1">
        Opppss
      </Typography>
      <p className="tw-mb-8 tw-text-gray-400">There is no page here</p>
      <Button variant="contained" href="/" component={Link}>
        Back to Home
      </Button>
    </div>
  );
}
