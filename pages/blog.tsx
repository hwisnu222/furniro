import React from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";

import Benefite from "@/components/footers/Benefite";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import HeaderProduct from "@/components/headers/HeaderProduct";
import Container from "@/components/layouts/Container";

import FunitureImg from "../assets/images/furniture.png";
import {
  CalendarToday,
  Person,
  LocalOffer,
  SearchOutlined,
} from "@mui/icons-material";

export default function Blog() {
  return (
    <>
      <Header />
      <HeaderProduct title="Blog" paths={[{ label: "Blog", url: "/blog" }]} />
      <Container>
        <Box className="tw-flex tw-flex-col tw-gap-8 tw-pt-8 md:tw-flex-row">
          <div className="md:tw-w-3/4">
            {Array.from({ length: 8 }).map((post, index) => (
              <section className="tw-mb-8" key={`post-${index}`}>
                <Image
                  src={FunitureImg}
                  alt="thumbnail-post"
                  fill={false}
                  className="object-cover ronded-md tw-h-72 tw-w-full"
                />
                <div className="tw-flex tw-gap-8 tw-py-2">
                  <section className="tw-flex tw-items-center tw-gap-2 tw-text-gray-400">
                    <Person fontSize="small" />
                    <span>Admin</span>
                  </section>
                  <section className="tw-flex tw-items-center tw-gap-2 tw-text-gray-400">
                    <CalendarToday fontSize="small" />
                    <span>14 Oct 2022</span>
                  </section>
                  <section className="tw-flex tw-items-center tw-gap-2 tw-text-gray-400">
                    <LocalOffer fontSize="small" />
                    <span>Wood</span>
                  </section>
                </div>
                <div className="tw-p-2">
                  <h3 className="te-font-bold tw-text-2xl">Title</h3>
                  <p className="tw-mb-4 tw-text-gray-400">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Voluptates rerum, distinctio nam voluptate perspiciatis
                    eaque, adipisci molestiae aliquid earum aspernatur repellat
                    quam voluptatem facere ipsa illo sint temporibus dolores at
                    aperiam totam neque necessitatibus? Cumque!
                  </p>
                  <Button>Read More</Button>
                </div>
              </section>
            ))}
          </div>
          <div>
            <TextField
              className="tw-mb-8 tw-w-full"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <div className="tw-p-4">
              <h3 className="tw-text-2xl tw-font-bold">Categories</h3>
              <ul className="tw-mb-8 tw-text-gray-400">
                {Array.from({ length: 5 }).map((category, index) => (
                  <li
                    className="cursor-pointer tw-flex tw-justify-between tw-py-4 hover:tw-text-gray-600"
                    key={`category-${index}`}
                  >
                    <span>Category</span>
                    <span>0</span>
                  </li>
                ))}
              </ul>

              <h3 className="tw-mb-4 tw-text-2xl tw-font-bold">Recent Posts</h3>
              <div className="tw-flex tw-items-center tw-gap-4">
                <Image
                  src={FunitureImg}
                  alt="thumbnail-recent"
                  fill={false}
                  className="tw-h-20 tw-w-20 tw-rounded-sm"
                />
                <div>
                  <p className="tw-cursor-pointer">Lorem ipsum dolom</p>
                  <p className="tw-text-sm tw-text-gray-400">03 Aug 2022</p>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Container>

      <Benefite />
      <Footer />
    </>
  );
}
