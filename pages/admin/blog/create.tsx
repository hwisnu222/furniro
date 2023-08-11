import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import {
  TextField,
  Button,
  Box,
  SelectChangeEvent,
  MenuItem,
  Select,
} from "@mui/material";
import HeaderCard from "@/components/headers/HeaderCard";
import DashboardLayout from "@/components/layouts/DasboardLayout";
import { ImageOutlined } from "@mui/icons-material";

import client from "@/graphql/client";
import {
  CREATE_POST_BLOG,
  GET_CATEGORY_BLOG,
} from "@/graphql/queries/blog.query";

import { CategoryBlog } from "@/interfaces/listBlogs.interface";
import { uploadMedia } from "@/services/upload";

export default function CreateBlogPost({
  categories,
}: {
  categories: CategoryBlog[];
}) {
  const editorRef = React.useRef(null);
  const [category, setCategory] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [file, setFile] = React.useState<any | null>(null);

  const [createPostBlog] = useMutation(CREATE_POST_BLOG);

  const handleSelectCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleDrop = (acceptedFile: any) => {
    setFile(acceptedFile[0]);
    console.log(file);
  };

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const clearForm = () => {
    setTitle("");
    setFile(null);
    setCategory("");
  };

  const createPost = async () => {
    const formData = new FormData();
    formData.append("files", file);
    const idMedia = await uploadMedia(formData);

    createPostBlog({
      variables: {
        data: {
          title,
          article: editorRef.current.getContent(),
          category_blog: category,
          image: idMedia,
        },
      },
      onCompleted: () => {
        alert("Post is created!");
        clearForm(0);
      },
      onError: () => {
        alert("Failed post blog!");
      },
    });
  };

  return (
    <DashboardLayout>
      <HeaderCard
        title="Create Blog Post"
        rightAction={
          <Button
            variant="contained"
            className="tw-bg-default-200"
            size="large"
            onClick={createPost}
          >
            Publish
          </Button>
        }
      />
      <Box className="tw-flex tw-flex-col tw-gap-4">
        <TextField label="Title" onChange={handleSetTitle} value={title} />
        <Select
          value={category}
          label="Category"
          onChange={handleSelectCategory}
          className="tw-mb-8"
        >
          {categories.map((category: CategoryBlog, index: number) => (
            <MenuItem value={category.id} key={`category-blog-${index}`}>
              {category.attributes.category}
            </MenuItem>
          ))}
        </Select>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <Box
              className="tw-rounded-md tw-border tw-border-dashed tw-p-12"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Box className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 md:tw-flex-row ">
                {file ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="file-image"
                    fill={false}
                    width={100}
                    height={100}
                    className="tw-h-24 tw-w-24 tw-object-cover"
                  />
                ) : (
                  <ImageOutlined />
                )}
                <p>{file?.name || `Drag your file here`}</p>
              </Box>
            </Box>
          )}
        </Dropzone>
      </Box>
    </DashboardLayout>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_CATEGORY_BLOG,
  });
  const categories = data.categoryBlogs.data;
  return {
    props: {
      categories,
    },
  };
}
