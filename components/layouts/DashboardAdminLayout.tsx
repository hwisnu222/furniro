import React from "react";
import { Tabs, Tab, Box, Card } from "@mui/material";
import HeaderAdmin from "@/components/headers/HeaderAdmin";

import Container from "@/components/layouts/Container";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const route = React.useMemo(() => pathname.split("/")[2], [pathname]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    switch (newValue) {
      case "blog":
        router.push("/admin/blog/list");
        break;
      case "transaction":
        router.push("/admin/transaction/list");
        break;
      case "contact":
        router.push("/admin/contact/list");
        break;

      default:
        router.push("/admin/product/list");
        break;
    }
  };

  return (
    <Box className="tw-min-h-screen tw-bg-purple-100">
      <HeaderAdmin />
      <Tabs className="tw-bg-white" value={route} onChange={handleChangeTab}>
        <Tab label="Product" value="product" />
        <Tab label="Blog" value="blog" />
        <Tab label="Transaction" value="transaction" />
        <Tab label="Contact" value="contact" />
      </Tabs>
      <Container className="tw-py-4">
        <Card className="tw-p-4">{children}</Card>
      </Container>
    </Box>
  );
}
