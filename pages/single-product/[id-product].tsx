"use client";

import React from "react";
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
} from "@mui/material";
import Image from "next/image";

import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import ProductLayout from "@/components/layouts/ProductLayout";
import Products from "@/components/cards/Products";
import Container from "@/components/layouts/Container";

import products from "@/json/products";
import FurnitureImg from "../../assets/images/furniture.png";
import { AddOutlined } from "@mui/icons-material";

const DescriptionPannel: React.FC = () => {
  return (
    <Container>
      <p className="tw-text-gray-400">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis,
        voluptatem exercitationem consectetur non ratione asperiores sed
        corporis nam perferendis, cumque inventore. Itaque et distinctio fugiat
        odio porro provident consequatur repellat eos quasi obcaecati tenetur,
        ducimus id cupiditate expedita aliquam, deserunt laborum. Repellat
        placeat qui in tenetur vero modi, porro omnis cupiditate magnam ducimus
        consequuntur vitae veniam voluptate amet nam reprehenderit fuga
        perspiciatis quod eveniet inventore mollitia, laborum fugiat! Pariatur
        sapiente laborum adipisci commodi? Beatae maiores rem vel, delectus hic
        veritatis debitis? Vitae repellat, atque explicabo aspernatur
        repudiandae dolore recusandae unde libero! Molestiae fugit beatae, quasi
        unde temporibus at vero impedit velit quae maxime earum eaque, qui fuga
        ipsum, nihil illo praesentium quidem numquam doloremque! Tenetur
        similique debitis nisi, sapiente amet soluta maxime, exercitationem
        impedit molestiae aut odio voluptatum dignissimos t consequatur ipsa
        laudantium? Cupiditate voluptas tempore, quos odio autem delectus
        excepturi culpa perspiciatis, maiores, consectetur assumenda.
      </p>
      <Box className="tw-grid tw-w-full tw-grid-cols-1 tw-gap-4  md:tw-grid-cols-2">
        <Image
          src={FurnitureImg}
          alt="description-product"
          fill={false}
          className="object-cover tw-h-52 tw-w-full"
        />
        <Image
          src={FurnitureImg}
          alt="description-product"
          fill={false}
          className="object-cover tw-h-52 tw-w-full"
        />
      </Box>
    </Container>
  );
};

const TabPannel = (key: string) => {
  switch (key) {
    case " additional":
      return "additonal";
    case "review":
      return "review";
    default:
      return <DescriptionPannel />;
  }
};

export default function SingleProduct() {
  const [tab, setTab] = React.useState("description");

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
            id-product2323
          </Link>
        </Breadcrumbs>
      </div>
      <div className="tw-container tw-mx-auto tw-mb-8 tw-grid tw-grid-cols-1 tw-gap-4 tw-px-8 md:tw-grid-cols-2 md:tw-gap-20">
        <div className="tw-flex tw-gap-6">
          <Stack direction="column" gap={3}>
            <Image
              src={FurnitureImg}
              alt="furniture"
              className="tw-w-full"
              fill={false}
            />
            <Image
              src={FurnitureImg}
              alt="furniture"
              className="tw-w-full"
              fill={false}
            />
            <Image
              src={FurnitureImg}
              alt="furniture"
              className="tw-w-full"
              fill={false}
            />
          </Stack>
          <Image
            src={FurnitureImg}
            alt="furniture"
            className="tw-flex-4 tw-h-3/4 tw-w-full tw-object-cover"
            fill={false}
          />
        </div>
        <Box gap={6} className="tw-w-full">
          <h3 className="tw-text-4xl">Furniture</h3>
          <p className="tw-text-xl tw-font-semibold tw-text-gray-300">
            Rp 25.000.000
          </p>
          <Stack direction="row" alignItems="center">
            <Rating value={4} />
            <Divider orientation="vertical" className="tw-mx-2 tw-my-6" />
            <span className="tw-text-sm tw-text-gray-300">
              5 Customer Review
            </span>
          </Stack>
          <p className="tw-mb-8">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,
            amet ipsum vero illum incidunt aliquam nihil at enim officiis,
            dolores modi excepturi molestias commodi eius quae. Adipisci ad
            quaerat repellendus quibusdam nostrum natus blanditiis eligendi
            accusantium quae, maxime incidunt voluptatum expedita perspiciatis
            velit voluptate iure sit quos, libero totam est vero impedit. Ex
            quia libero illo suscipit nam eum, recusandae dignissimos. Nesciunt
            totam vero quas suscipit. Dolor illo, exercitationem asperiores
            quidem blanditiis, tempora provident repellat veniam illum assumenda
            excepturi quam facilis modi accusamus deleniti perferendis vitae.
            Ipsam magni rem totam culpa saepe veniam eveniet voluptatibus,
            magnam iure? Eos, ad unde?
          </p>

          <h3 className="tw-mb-2 tw-font-semibold tw-text-gray-400">Size</h3>
          <div className="tw-mb-8 tw-flex tw-gap-2">
            {["L", "XL", "XS"].map((size: string, index: number) => (
              <span
                className="tw-flex tw-h-10 tw-w-10 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-bg-default-100 hover:tw-bg-default-200 hover:tw-text-white"
                key={`size-${index}`}
              >
                {size}
              </span>
            ))}
          </div>

          <h3 className="tw-mb-2 tw-font-semibold tw-text-gray-400">Color</h3>
          <div className="tw-flex tw-gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                className="tw-h-6 tw-w-6 tw-cursor-pointer tw-rounded-full tw-border-2 tw-border-transparent tw-bg-purple-500 hover:tw-border-gray-200"
                key={`color-${index}`}
              ></span>
            ))}
          </div>

          <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-py-4 md:tw-flex-row  md:tw-items-center md:tw-justify-start">
            <Stack
              direction="row"
              alignItems="center"
              className="tw-rounded-md tw-border-2"
            >
              <IconButton>
                <AddOutlined />
              </IconButton>
              <span>1</span>
              <IconButton>
                <AddOutlined />
              </IconButton>
            </Stack>
            <Button variant="outlined">Add to Cart</Button>
            <Button variant="outlined">Compare</Button>
          </div>

          <Divider className="tw-my-6" />

          <table className="tw-text-gray-400 ">
            <tbody>
              <tr>
                <td className="tw-py-2 tw-pr-4">SKU</td>
                <td>: SS01</td>
              </tr>
              <tr>
                <td className="tw-py-2 tw-pr-4">Category</td>
                <td>: Sofas</td>
              </tr>
              <tr>
                <td className="tw-py-2 tw-pr-4">Tags</td>
                <td>: Sofa, Chair, Home, Shop</td>
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
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          className="tw-mb-4"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="description" label="Description" />
          <Tab value="additional" label="Additional Informations" />
          <Tab value="review" label="Reviews (3)" />
        </Tabs>
        {TabPannel(tab)}
      </Container>

      <ProductLayout title="Related Products">
        <Products data={products()} />
      </ProductLayout>
      <Footer />
    </>
  );
}
