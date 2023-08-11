`use client`;
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

import client from "@/graphql/client";
import { GET_BLOGS } from "@/graphql/queries/blog.query";

import { ListBlogProps } from "@/interfaces/listBlogs.interface";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { formatDate } from "@/utils/date";

export default function Blog({ blogs }: { blogs: ListBlogProps }) {
  const [blogsList, setBlogList] = React.useState(blogs || []);
  const [search, setSearch] = React.useState("");

  const [getBlogs] = useLazyQuery(GET_BLOGS, {
    variables: {
      filter: search,
    },
    onCompleted: (data) => {
      setBlogList(data.blogs.data);
    },
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleGetBlogs = () => {
    getBlogs();
  };
  return (
    <>
      <Header />
      <HeaderProduct title="Blog" paths={[{ label: "Blog", url: "/blog" }]} />
      <Container>
        <Box className="tw-flex tw-flex-col tw-gap-8 tw-pt-8 md:tw-flex-row">
          <div className="md:tw-w-3/4">
            {blogsList.map((post: ListBlogProps, index: number) => (
              <section className="tw-mb-8" key={`post-${index}`}>
                <Image
                  src={FunitureImg}
                  alt="thumbnail-post"
                  fill={false}
                  width={600}
                  height={350}
                  className="object-cover ronded-md tw-h-72 tw-w-full"
                />
                <div className="tw-flex tw-gap-8 tw-py-2">
                  <section className="tw-flex tw-items-center tw-gap-2 tw-text-gray-400">
                    <Person fontSize="small" />
                    <span>Admin</span>
                  </section>
                  <section className="tw-flex tw-items-center tw-gap-2 tw-text-gray-400">
                    <CalendarToday fontSize="small" />
                    <span suppressHydrationWarning>
                      {formatDate(post.attributes.createdAt)}
                    </span>
                  </section>
                  <section className="tw-flex tw-items-center tw-gap-2 tw-text-gray-400">
                    <LocalOffer fontSize="small" />
                    <span>
                      {post.attributes.category_blog?.data?.attributes
                        .category || "-"}
                    </span>
                  </section>
                </div>
                <div className="tw-p-2">
                  <h3 className="te-font-bold tw-text-2xl">
                    {post.attributes.title}
                  </h3>
                  <div
                    className="tw-mb-4 tw-text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: post.attributes.article.slice(0, 200),
                    }}
                  ></div>
                  <Button component={Link} href={`/single-blog/${post.id}`}>
                    Read More
                  </Button>
                </div>
              </section>
            ))}
          </div>
          <div>
            <TextField
              className="tw-mb-8 tw-w-full"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleGetBlogs}>
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
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

export async function getServerSideProps() {
  const { data } = await client.query({ query: GET_BLOGS });
  const blogs = data.blogs.data;
  return {
    props: {
      blogs,
    },
  };
}
