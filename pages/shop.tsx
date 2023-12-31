import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";

import {
  MenuItem,
  Select,
  TextField,
  Stack,
  SelectChangeEvent,
} from "@mui/material";

import Header from "@/components/headers/Header";

import { Box } from "@mui/system";

import { GET_PRODUCTS } from "@/graphql/queries/product.query";

import Products from "@/components/cards/Products";
import Footer from "@/components/footers/Footer";
import HeaderProduct from "@/components/headers/HeaderProduct";
import Benefite from "@/components/footers/Benefite";
import Filter from "@/components/filters/Filter";
import NotList from "@/components/notFound/NotList";

export default function Shop() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const params = React.useMemo(
    () => new URLSearchParams(search.toString()),
    [search],
  );

  const sort = params.get("s");
  const [order, setOrder] = React.useState(sort || "asc");
  const [filters, setFilter] = React.useState({});

  const createQuery = React.useCallback(
    (param: any, value: string) => {
      params.set(param, value);
      return params.toString();
    },
    [params],
  );

  const { data, refetch, loading } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "no-cache",
    variables: {
      filters: {
        name: {
          containsi: search.get("search") || "",
        },
        or: filters,
      },
      sort: `price:${order}`,
    },
  });

  const handleOnApply = (data: any) => {
    setFilter(data);
    refetch();
  };

  const handleOrder = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setOrder(value);
    // set query string
    router.push(`${pathname}?${createQuery("s", value)}`);
  };
  return (
    <>
      <Header />
      <HeaderProduct title="Shop" paths={[{ label: "Shop" }]} />

      <div className="tw-mb-8 tw-flex tw-flex-col tw-items-center tw-gap-4 tw-bg-default-100 tw-p-2 md:tw-flex-row md:tw-justify-around">
        <Stack direction="row" gap={2} alignItems="center">
          <Filter onApply={handleOnApply} />

          <span>
            Showing {data?.products?.data?.length} of{" "}
            {data?.products.meta.pagination.total} results
          </span>
        </Stack>

        <Stack direction="row" gap={4}>
          {/* <Stack direction="row" alignItems="center" gap={2}>
            <span>Show</span>
            <TextField disabled size="small" className="tw-w-10" />
          </Stack> */}
          <Stack direction="row" alignItems="center" gap={2}>
            <span>Short By</span>
            <Select value={order} onChange={handleOrder} size="small">
              <MenuItem value="asc">Lowest Price</MenuItem>
              <MenuItem value="desc">Highest Price</MenuItem>
            </Select>
          </Stack>
        </Stack>
      </div>
      <Box className="tw-container tw-mx-auto tw-px-10">
        {!data?.products?.data?.length && !loading && <NotList />}

        <Products data={data?.products?.data} refetch={refetch} />
      </Box>

      <Benefite />
      <Footer />
    </>
  );
}
