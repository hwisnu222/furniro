import React from "react";
import { Tabs, Tab, Box, Card } from "@mui/material";
import HeaderAdmin from "@/components/headers/HeaderAdmin";

import Container from "@/components/layouts/Container";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const route = React.useMemo(() => pathname.split("/")[2], [pathname]);

  const handleChangeTab = (event: React.SyntheticEvent, path: string) => {
    router.push(`/user/${path}`);
  };

  return (
    <Box className="tw-min-h-screen tw-bg-purple-100">
      <HeaderAdmin />
      <Tabs className="tw-bg-white" value={route} onChange={handleChangeTab}>
        <Tab label="Transaction" value="transaction" />
        <Tab label="Wishlist" value="wishlist" />
      </Tabs>
      <Container className="tw-py-4">
        <Card className="tw-p-4">{children}</Card>
      </Container>
    </Box>
  );
}
