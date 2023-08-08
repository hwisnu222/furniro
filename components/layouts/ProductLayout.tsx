import React from "react";
import { TitleOutlined } from "@mui/icons-material";
import Container from "./Container";

interface ContentProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function ProductLayout({
  children,
  title,
  description,
}: ContentProps) {
  return (
    <Container>
      <div className=" tw-mb-8 tw-text-center">
        <h3 className="text-red-400 tw-mb-4 tw-text-2xl tw-font-semibold">
          {title}
        </h3>
        {description && <p className="tw-mb-8">{description}</p>}
        {children}
      </div>
    </Container>
  );
}
