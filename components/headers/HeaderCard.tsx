import React from "react";
import { Box, Typography } from "@mui/material";
import { HeaderCardProps } from "@/interfaces/headerCard.interface";

export default function HeaderCard({ title, rightAction }: HeaderCardProps) {
  return (
    <Box className="tw-mb-4 tw-flex tw-items-center tw-justify-between tw-border-b tw-px-4 tw-py-2">
      <Typography variant="h6" className="tw-font-bold">
        {title}
      </Typography>
      <Box className="tw-flex tw-gap-2">{rightAction}</Box>
    </Box>
  );
}
