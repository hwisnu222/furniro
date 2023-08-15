import React from "react";
import client from "@/graphql/client";

import Header from "@/components/headers/Header";
import Image from "@/components/images/Image";
import Container from "@/components/layouts/Container";
import { Box, Typography } from "@mui/material";

import { GET_DETAIL_BLOG } from "@/graphql/queries/blog.query";
import { ListBlogProps } from "@/interfaces/listBlogs.interface";
import { formatDate } from "@/utils/date";

export default function SingleProduct({ post }: { post: ListBlogProps }) {
  return (
    <>
      <Header />
      <Container className="tw-py-8">
        <Typography className="tw-mb-4" variant="h4">
          {post.attributes.title}
        </Typography>
        <Box className="tw-flex tw-justify-center">
          <Image
            src={post.attributes.image.data?.attributes.url}
            alt="thumbnail-blog"
            width={900}
            height={200}
            fill={false}
            className="tw-w-ful md:tw-w-1/2"
          />
        </Box>

        <Box className="tw-mb-4 tw-mt-8 tw-flex tw-gap-4 tw-text-gray-400">
          <span>{formatDate(post.attributes.createdAt)}</span>
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
  const slug = ctx.params["slug"];
  const { data } = await client.query({
    query: GET_DETAIL_BLOG,
    variables: {
      slug,
    },
  });

  const post = data.blogs.data[0];
  return {
    props: {
      post,
    },
  };
}
