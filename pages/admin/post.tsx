import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Dropzone from "react-dropzone";
import Image from "next/image";
import {
  Tabs,
  Tab,
  TextField,
  Typography,
  Button,
  Box,
  Card,
  SelectChangeEvent,
  MenuItem,
  Select,
} from "@mui/material";
import HeaderAdmin from "@/components/headers/HeaderAdmin";

import Container from "@/components/layouts/Container";
import { ImageOutlined } from "@mui/icons-material";
import { ImageDrop } from "@/interfaces/dropzone.interface";

export default function Post() {
  const editorRef = React.useRef(null);
  const [tab, setTab] = React.useState("post");
  const [category, setCategory] = React.useState("");
  const [file, setFile] = React.useState<any | null>(null);

  const handleSelectCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleDrop = (acceptedFile: any) => {
    setFile(acceptedFile[0]);
    console.log(file);
  };

  return (
    <Box className="tw-min-h-screen tw-bg-purple-100">
      <HeaderAdmin />
      <Tabs className="tw-bg-white" value={tab}>
        <Tab label="Product" value="post" />
        <Tab label="Blog" value="blog" />
      </Tabs>
      <Container className="tw-py-4">
        <Card className="tw-p-4">
          <Box className="tw-mb-4 tw-flex tw-items-center tw-justify-between tw-border-b tw-px-4 tw-py-2">
            <Typography variant="h6" className="tw-font-bold">
              Create Post
            </Typography>
            <Button
              variant="contained"
              className="tw-bg-default-200"
              size="large"
            >
              Publish
            </Button>
          </Box>
          <Box className="tw-flex tw-flex-col tw-gap-4">
            <TextField label="Title" />
            <Select
              value={category}
              label="Category"
              onChange={handleSelectCategory}
              className="tw-mb-8"
            >
              <MenuItem value="ten">Ten</MenuItem>
              <MenuItem value="twenty">Twenty</MenuItem>
              <MenuItem value="thirty">Thirty</MenuItem>
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
        </Card>
      </Container>
    </Box>
  );
}
