import React from "react";
import { Stack, Box } from "@mui/material";
import {
  EmojiEventsOutlined,
  VerifiedOutlined,
  LocalShippingOutlined,
  SupportAgentOutlined,
} from "@mui/icons-material";
import Container from "./layouts/Container";

const benefites = [
  {
    icon: <EmojiEventsOutlined className="tw-h-12 tw-w-12" />,
    title: "High Quality",
    description: "crafted from top materials",
  },
  {
    icon: <VerifiedOutlined className="tw-h-12 tw-w-12" />,
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    icon: <LocalShippingOutlined className="tw-h-12 tw-w-12" />,
    title: "Free Shipping",
    description: "Order over 150 $",
  },
  {
    icon: <SupportAgentOutlined className="tw-h-12 tw-w-12" />,
    title: "24 / 7 Support",
    description: "Dedicated support",
  },
];

export default function Benefite() {
  return (
    <Container>
      <Box className="tw-grid tw-grid-cols-2 tw-gap-4 tw-bg-default-100 tw-px-8 tw-py-16 md:tw-grid-cols-4 md:tw-gap-0">
        {benefites.map((benefite, index) => (
          <Stack
            className="tw-flex-col tw-items-center tw-gap-2 md:tw-flex-row"
            key={`benefite-${index}`}
          >
            {benefite.icon}
            <div className="tw-text-center md:tw-text-left">
              <h3 className="tw-font-semibold">{benefite.title}</h3>
              <p className="tw-text-sm tw-font-semibold tw-text-gray-400">
                {benefite.description}
              </p>
            </div>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
