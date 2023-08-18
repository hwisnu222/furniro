`use client`;
import React from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";

import Benefite from "@/components/footers/Benefite";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import HeaderProduct from "@/components/headers/HeaderProduct";
import Container from "@/components/layouts/Container";
import Image from "@/components/images/Image";

import FunitureImg from "../assets/images/furniture.png";
import {
  CalendarToday,
  Person,
  LocalOffer,
  SearchOutlined,
} from "@mui/icons-material";

import client from "@/graphql/client";
import {
  GET_BLOGS,
  GET_CATEGORY_BLOGS,
  GET_RECENT_BLOGS,
} from "@/graphql/queries/blog.query";

import { ListBlogProps } from "@/interfaces/listBlogs.interface";
import { useLazyQuery, useQuery } from "@apollo/client";
import Link from "next/link";
import { formatDate } from "@/utils/date";
import { categoryBlogItem } from "@/interfaces/categoryBlog.interface";

export default function Blog({ blogs }: { blogs: ListBlogProps[] }) {
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
  const { data: dataRecentBlogs } = useQuery(GET_RECENT_BLOGS);
  const { data: categoryBlogs } = useQuery(GET_CATEGORY_BLOGS);

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
                  src={post.attributes.image.data.attributes.url}
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
                  <h3 className="te-font-bold tw-text-2xl tw-capitalize">
                    {post.attributes.title}
                  </h3>
                  <div
                    className="tw-mb-4 tw-text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: post.attributes.article.slice(0, 200),
                    }}
                  ></div>
                  <Button
                    component={Link}
                    href={`/single-blog/${post.attributes.slug}`}
                  >
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
                {categoryBlogs?.categoryBlogs.data?.map(
                  (category: categoryBlogItem, index: number) => (
                    <li
                      className="cursor-pointer tw-flex tw-justify-between tw-py-4 hover:tw-text-gray-600"
                      key={`category-${index}`}
                    >
                      <span>{category.attributes.category}</span>
                      <span>{category.attributes.blogs.data?.length || 0}</span>
                    </li>
                  ),
                )}
              </ul>

              <h3 className="tw-mb-4 tw-text-2xl tw-font-bold">Recent Posts</h3>
              <div className="tw-flex tw-flex-col tw-gap-4">
                {dataRecentBlogs?.blogs.data.map(
                  (blog: ListBlogProps, index: number) => (
                    <div
                      className="tw-flex tw-items-center tw-gap-4"
                      key={`recent-post-${index}`}
                    >
                      {/* <Image
                  src={FunitureImg}
                  alt="thumbnail-recent"
                  fill={false}
                  className="tw-h-20 tw-w-20 tw-rounded-sm"
                /> */}
                      <div>
                        <Link href={`/single-blog/${blog.attributes.slug}`}>
                          <p className="tw-cursor-pointer tw-capitalize hover:tw-text-gray-500">
                            {blog.attributes.title}
                          </p>
                        </Link>{" "}
                        <p className="tw-text-sm tw-text-gray-400">
                          {formatDate(blog.attributes.createdAt)}
                        </p>
                      </div>
                    </div>
                  ),
                )}
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
