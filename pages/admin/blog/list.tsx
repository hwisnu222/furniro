import React from "react";
import Link from "next/link";

import HeaderCard from "@/components/headers/HeaderCard";
import DashboardLayout from "@/components/layouts/DashboardAdminLayout";

import {
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Table,
  Button,
  Box,
  TextField,
  Chip,
} from "@mui/material";
import { formatDate } from "@/utils/date";
import client from "@/graphql/client";
import { GET_BLOGS } from "@/graphql/queries/blog.query";

import { ListBlogProps } from "@/interfaces/listBlogs.interface";
import { useLazyQuery } from "@apollo/client";

export default function List({ blogs }: { blogs: ListBlogProps[] }) {
  const [blogsList, setBlogsList] = React.useState(blogs || []);
  const [search, setSearch] = React.useState("");

  const [getBlog] = useLazyQuery(GET_BLOGS, {
    variables: {
      filter: search,
    },
    onCompleted: (data) => {
      const dataBlogs = data.blogs.data;
      setBlogsList(dataBlogs);
    },
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    getBlog();
  };
  return (
    <DashboardLayout>
      <HeaderCard
        title="Blog Lists"
        rightAction={
          <Button
            variant="contained"
            className="tw-bg-default-200"
            component={Link}
            href="/admin/blog/create"
            size="large"
          >
            Create Post
          </Button>
        }
      />
      <Box className="tw-mb-4 tw-flex tw-items-center tw-justify-between tw-gap-2">
        <p className="tw-text-gray-400">Show from 1 to 20 result</p>

        <Box>
          <Button className="tw-mr-4">Filter</Button>
          <TextField
            placeholder="Search"
            size="small"
            onChange={handleSearch}
          />
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogsList.map((blog, index) => (
              <TableRow
                key={`blog-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {blog.attributes.title}
                </TableCell>
                <TableCell align="right">
                  {blog.attributes.users_permissions_user.data?.attributes
                    ?.username || "-"}
                </TableCell>
                <TableCell align="right">
                  <Chip label="Publised" />
                </TableCell>
                <TableCell align="right">
                  {formatDate(blog.attributes.createdAt)}
                </TableCell>
                <TableCell align="right">
                  {formatDate(blog.attributes.updatedAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_BLOGS,
  });
  const blogs = data.blogs.data;
  return {
    props: {
      blogs,
    },
  };
}
