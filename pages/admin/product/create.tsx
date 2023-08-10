import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Dropzone from "react-dropzone";
import Image from "next/image";
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

export default function CreatePostProduct() {
  const editorRef = React.useRef(null);
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
    <DashboardLayout>
      <HeaderCard
        title="Create Product"
        rightAction={
          <Button
            variant="contained"
            className="tw-bg-default-200"
            size="large"
          >
            Publish
          </Button>
        }
      />
      <Box className="tw-flex tw-flex-col tw-gap-6 md:tw-flex-row">
        <Box className="tw-flex tw-flex-col tw-gap-4 md:tw-w-3/4">
          <TextField label="Title" />
          <Select
            value={category}
            label="Category"
            onChange={handleSelectCategory}
          >
            <MenuItem value="ten">Ten</MenuItem>
            <MenuItem value="twenty">Twenty</MenuItem>
            <MenuItem value="thirty">Thirty</MenuItem>
          </Select>
          <Box className="tw-mb-8 tw-flex tw-gap-4">
            <TextField label="Price" className="tw-w-full" type="number" />
            <Select value="ten" label="Discount" className="tw-w-full">
              <MenuItem value="ten">10%</MenuItem>
              <MenuItem value="twenty">20%</MenuItem>
              <MenuItem value="thirty">30%</MenuItem>
            </Select>
          </Box>
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
        <Box className="tw-flex tw-flex-col tw-gap-4">
          <TextField label="SKU" />
          <TextField label="Stock" type="number" />
          <TextField label="Size" />
          <TextField label="Color" />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
