import React from "react";
import client from "@/graphql/client";

import Header from "@/components/headers/Header";
import Image from "@/components/images/Image";
import Container from "@/components/layouts/Container";
import { Box, Typography } from "@mui/material";

import { GET_DETAIL_BLOG } from "@/graphql/queries/blog.query";
import { ListBlogProps } from "@/interfaces/listBlogs.interface";

export default function SingleProduct({ post }: { post: ListBlogProps }) {
  return (
    <>
      <Header />
      <Container className="tw-py-8">
        <Image
          src={post.attributes.image.data?.attributes.url}
          alt="thumbnail-blog"
          width={900}
          height={200}
          fill={false}
          className="tw-w-ful md:tw-w-1/2"
        />
        <Typography className="tw-mb-4">{post.attributes.title}</Typography>
        <Box className="tw-mb-4 tw-flex tw-gap-4 tw-text-gray-400">
          <span>{post.attributes.title}</span>
          <span>{post.attributes.createdAt}</span>
          <span>
            {post.attributes.category_blog?.data?.attributes.category}
          </span>
        </Box>
        <p dangerouslySetInnerHTML={{ __html: post.attributes.article }}></p>
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const idBlog = ctx.params["id-blog"];
  const { data } = await client.query({
    query: GET_DETAIL_BLOG,
    variables: {
      id: idBlog,
    },
  });
  console.log(data);

  const post = data.blog.data;
  return {
    props: {
      post,
    },
  };
}
