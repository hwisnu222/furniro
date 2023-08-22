import React from "react";
import client from "@/graphql/client";
import { useMutation, useQuery } from "@apollo/client";
import { enqueueSnackbar } from "notistack";
import { useSession } from "next-auth/react";

import {
  Breadcrumbs,
  Link,
  Rating,
  Typography,
  Stack,
  Divider,
  Box,
  Button,
  IconButton,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import Image from "@/components/images/Image";
import { AddOutlined, Edit } from "@mui/icons-material";

import { GET_PRODUCT, GET_PRODUCTS } from "@/graphql/queries/product.query";
import { ADD_CART } from "@/graphql/mutations/cart.mutation";

import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import ProductLayout from "@/components/layouts/ProductLayout";
import Products from "@/components/cards/Products";
import Container from "@/components/layouts/Container";
import RoleComponent from "@/components/authorization/RoleComponent";

import { ROLE } from "@/constants";
import { convertCurrency } from "@/utils/currency";
import { ItemProduct } from "@/interfaces/product.interface";
import { GET_REVIEWS } from "@/graphql/queries/review.query";
import NotList from "@/components/notFound/NotList";
import { CREATE_REVIEW } from "@/graphql/mutations/review.mutation";
import { formatDate } from "@/utils/date";

const DescriptionPanel = ({ description }: { description: string }) => {
  return (
    <Container>
      <div
        className="tw-text-center tw-text-gray-400"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </Container>
  );
};

const ReviewPanel = ({ idProduct }: { idProduct: number | string }) => {
  const session = useSession();

  const [review, setReview] = React.useState("");
  const { data, refetch } = useQuery(GET_REVIEWS, {
    variables: {
      filters: {
        product: {
          id: { eq: idProduct },
        },
      },
      sort: "createdAt:desc",
    },
  });
  const [addReview] = useMutation(CREATE_REVIEW);

  const handleAddreview = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      addReview({
        variables: {
          data: {
            review,
            product: idProduct,
            users_permissions_user: session.data?.user.id,
          },
        },
        onCompleted: () => {
          refetch();
          setReview("");
          enqueueSnackbar("Review has added!", { variant: "success" });
        },
        onError: () => {
          enqueueSnackbar("failed add review to product!", {
            variant: "error",
          });
        },
      });
    }
  };

  const handleChangeReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  return (
    <Box>
      <TextField
        value={review}
        placeholder="Your review"
        className="tw-mb-4 tw-w-full"
        onChange={handleChangeReview}
        onKeyDown={handleAddreview}
      />
      <Divider className="tw-mb-4" />
      {!data?.reviews.data.length && <NotList />}
      <Stack gap={2}>
        {data?.reviews.data.map((review: any, index: number) => (
          <Box key={`review-${index}`}>
            <Box className="tw-flex tw-justify-between">
              <Typography>
                {review.attributes.users_permissions_user?.data.attributes
                  .profile.data?.attributes.firstname || "Anonym"}
              </Typography>
              <Typography className="tw-text-sm tw-text-gray-400">
                {formatDate(review.attributes.createdAt)}
              </Typography>
            </Box>
            <Typography className="tw-text-sm tw-text-gray-400">
              {review.attributes.review}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

const TabPannel = (key: string, product: ItemProduct) => {
  switch (key) {
    case "additional":
      return (
        <p className="tw-text-center tw-text-gray-400">
          {product.attributes.additional}
        </p>
      );
    case "review":
      return <ReviewPanel idProduct={product.id} />;
    default:
      return <DescriptionPanel description={product.attributes.description} />;
  }
};

const LIMIT_BUY = 0;

export default function SingleProduct({
  product,
  products,
}: {
  product: ItemProduct;
  products: ItemProduct[];
}) {
  const session = useSession();
  const [tab, setTab] = React.useState("description");
  const [buyTotal, setBuyTotal] = React.useState(0);

  const [addCart] = useMutation(ADD_CART);

  const handleAddCart = (id: number) => {
    addCart({
      variables: {
        data: {
          total: buyTotal,
          product: id,
          users_permissions_user: session.data?.user.id,
        },
      },
      onCompleted: () => {
        enqueueSnackbar("Product has added to cart", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("failed add product to cart", { variant: "error" });
      },
    });
  };

  const handleTotalProduct = (action: string) => {
    if (action === "increase" && buyTotal <= product?.attributes.stock) {
      return setBuyTotal((prev: number) => prev + 1);
    }
    if (action === "decrease" && buyTotal > LIMIT_BUY) {
      setBuyTotal((prev: number) => prev - 1);
    }
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  return (
    <>
      <Header />
      <div className="tw-mb-8  tw-bg-default-100 tw-px-10 tw-py-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" href="/">
            <Typography color="text.primary">Home</Typography>
          </Link>
          <Link underline="hover" color="inherit" href="/shop">
            Shop
          </Link>
          <Link underline="hover" color="inherit">
            {product?.attributes.name}
          </Link>
        </Breadcrumbs>
      </div>
      <div className="tw-container tw-mx-auto tw-mb-8 tw-grid tw-grid-cols-1 tw-gap-4 tw-px-8 md:tw-grid-cols-2 md:tw-gap-20">
        <div className="tw-flex tw-gap-6">
          <Stack direction="column" gap={3}>
            {product?.attributes.image?.data.map(
              (image: any, index: number) => (
                <Image
                  key={`variant-${index}`}
                  src={image.attributes?.url}
                  alt="furniture"
                  width={100}
                  height={100}
                  className="tw-w-52"
                  fill={false}
                />
              ),
            )}
          </Stack>
          <Image
            src={product?.attributes.image?.data[0]?.attributes?.url}
            alt="furniture"
            className="tw-flex-4 tw-h-3/4 tw-w-full tw-object-cover"
            fill={false}
          />
        </div>
        <Box gap={6} className="tw-w-full">
          <Stack direction="row" gap={2}>
            <h3 className="tw-text-4xl">{product?.attributes.name}</h3>
            <RoleComponent role={[ROLE.Admin]}>
              <Link href={`/admin/product/edit?id=${product.id}`}>
                <IconButton>
                  <Edit />
                </IconButton>
              </Link>
            </RoleComponent>
          </Stack>
          <p className="tw-text-xl tw-font-semibold tw-text-gray-300">
            {convertCurrency(product?.attributes.price)}
          </p>
          <Stack direction="row" alignItems="center">
            <Rating value={product.attributes.rating} />
            <Divider orientation="vertical" className="tw-mx-2 tw-my-6" />
            <span className="tw-text-sm tw-text-gray-300">
              5 Customer Review
            </span>
          </Stack>
          <p className="tw-mb-8">{product?.attributes.summary}</p>

          {!!product?.attributes.size?.length && (
            <>
              <h3 className="tw-mb-2 tw-font-semibold tw-text-gray-400">
                Size
              </h3>
              <div className="tw-mb-8 tw-flex tw-gap-2">
                {product?.attributes.size?.map(
                  (size: string, index: number) => (
                    <span
                      className="tw-flex tw-h-10 tw-w-10 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-bg-default-100 hover:tw-bg-default-200 hover:tw-text-white"
                      key={`size-${index}`}
                    >
                      {size}
                    </span>
                  ),
                )}
              </div>
            </>
          )}

          {!!product?.attributes.color?.length && (
            <>
              <h3 className="tw-mb-2 tw-font-semibold tw-text-gray-400">
                Color
              </h3>
              <div className="tw-flex tw-gap-2">
                {product?.attributes.color.map(
                  (color: string, index: number) => (
                    <span
                      className={`tw-h-6 tw-w-6 tw-cursor-pointer tw-rounded-full tw-border-2 tw-border-transparent tw-bg-[${color}] hover:tw-border-gray-200`}
                      key={`color-${index}`}
                    ></span>
                  ),
                )}
              </div>
            </>
          )}

          <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-py-4 md:tw-flex-row  md:tw-items-center md:tw-justify-start">
            <Stack
              direction="row"
              alignItems="center"
              className="tw-rounded-md tw-border-2"
            >
              <IconButton onClick={() => handleTotalProduct("decrease")}>
                <AddOutlined />
              </IconButton>
              <span>{buyTotal}</span>
              <IconButton onClick={() => handleTotalProduct("increase")}>
                <AddOutlined />
              </IconButton>
            </Stack>
            <Button
              variant="outlined"
              onClick={() => handleAddCart(product.id)}
            >
              Add to Cart
            </Button>
            <Button variant="outlined">Compare</Button>
          </div>

          <Divider className="tw-my-6" />

          <table className="tw-text-gray-400 ">
            <tbody>
              <tr>
                <td className="tw-py-2 tw-pr-4">SKU</td>
                <td>: {product?.attributes.sku || "-"}</td>
              </tr>
              <tr>
                <td className="tw-py-2 tw-pr-4">Category</td>
                <td>
                  : {product?.attributes.category?.data?.attributes.category}
                </td>
              </tr>
              <tr>
                <td className="tw-py-2 tw-pr-4">Tags</td>
                <td>
                  :
                  {product?.attributes.tag
                    ? product?.attributes.tag.map(
                        (tag: string, index: number) => (
                          <span key={`tag-${index}`}>{tag}, </span>
                        ),
                      )
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="tw-py-2 tw-pr-4">Share</td>
                <td>: Facebook, Linkedin, Twitter</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </div>

      <Container className=" tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center">
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          aria-label="secondary tabs example"
          className="tw-mb-4"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="description" label="Description" />
          <Tab value="additional" label="Additional Informations" />
          <Tab
            value="review"
            label={`Reviews (${product.attributes.reviews?.data.length || 0})`}
          />
        </Tabs>
      </Container>
      <Container className="tw-mb-16">{TabPannel(tab, product)}</Container>

      <ProductLayout title="Related Products">
        <Products data={products} />
      </ProductLayout>
      <Footer />
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const slug = ctx.params["slug"];
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: {
      filters: { slug: { eq: slug } },
    },
  });
  const { data: dataProducts } = await client.query({
    query: GET_PRODUCTS,
    variables: {
      sort: "createdAt:desc",
    },
  });
  const product = data?.products?.data[0];
  const products = dataProducts?.products?.data.slice(0, 8);
  return {
    props: {
      product,
      products,
    },
  };
}
