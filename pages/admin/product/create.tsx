import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import client from "@/graphql/client";
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
import { CREATE_PRODUCT } from "@/graphql/mutations/product.mutation";
import { GET_CATEGORY } from "@/graphql/queries/product.query";
import { API_BASE } from "@/config/api";

enum Type {
  NAME = "NAME",
  PRICE = "PRICE",
  COLOR = "COLOR",
  SIZE = "SIZE",
  DESCRIPTION = "DESCRIPTION",
  SUMMARY = "SUMMARY",
  DISSCOUNT = "DISSCOUNT",
  CATEGORY = "CATEGORY",
  SKU = "SKU",
  STOCK = "STOCK",
  FILE = "FILE",
}

const initialState = {
  name: "",
  price: 0,
  color: [],
  size: [],
  description: "",
  summary: "",
  disscount: 0,
  category: "",
  sku: "",
  stock: 0,
  file: null,
};

const reducerFunction = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.NAME:
      return {
        ...state,
        name: action.payload,
      };
    case Type.PRICE:
      return {
        ...state,
        price: parseInt(action.payload),
      };
    case Type.COLOR:
      return {
        ...state,
        color: action.payload,
      };
    case Type.SIZE:
      return {
        ...state,
        size: action.payload,
      };
    case Type.DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case Type.SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };
    case Type.DISSCOUNT:
      return {
        ...state,
        disscount: parseInt(action.payload),
      };
    case Type.CATEGORY:
      return {
        ...state,
        category: parseInt(action.payload),
      };
    case Type.SKU:
      return {
        ...state,
        sku: action.payload,
      };
    case Type.STOCK:
      return {
        ...state,
        stock: parseInt(action.payload),
      };
    case Type.FILE:
      return {
        ...state,
        file: action.payload,
      };
    default:
      return state;
  }
};

interface CategoryProps {
  id: number;
  attributes: {
    category: string;
  };
}

export default function CreatePostProduct({
  categories,
}: {
  categories: CategoryProps[];
}) {
  const editorRef = React.useRef(null);
  const [state, dispatch] = React.useReducer(reducerFunction, initialState);
  console.log(categories);

  const [mutate] = useMutation(CREATE_PRODUCT);
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("files", state.file);
    const upload = await API_BASE.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(upload.data);

    return upload.data[0].id;
  };
  const handleSelectCategory = (event: SelectChangeEvent) => {
    dispatch({ type: Type.CATEGORY, payload: event.target.value });
  };

  const handleSelectDisscount = (event: SelectChangeEvent) => {
    dispatch({ type: Type.DISSCOUNT, payload: event.target.value });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    dispatch({ type: target.name, payload: target.value });
  };

  const submitPost = async () => {
    const idImage = await uploadFile();
    const variables = state;
    delete variables.file;
    variables.image = idImage;

    dispatch({
      type: Type.DESCRIPTION,
      payload: editorRef.current?.getContent(),
    });

    console.log(variables);

    mutate({
      variables: {
        data: variables,
      },
    });
  };

  const handleDrop = (acceptedFile: any) => {
    dispatch({ type: Type.FILE, payload: acceptedFile[0] });
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
            onClick={submitPost}
          >
            Publish
          </Button>
        }
      />
      <Box className="tw-flex tw-flex-col tw-gap-6 md:tw-flex-row">
        <Box className="tw-flex tw-flex-col tw-gap-4 md:tw-w-3/4">
          <TextField label="Name" onChange={handleChange} name={Type.NAME} />
          <Select
            value={state.category}
            label="Category"
            onChange={handleSelectCategory}
          >
            {categories.map((category, index) => (
              <MenuItem value={category.id} key={`category-${index}`}>
                {category.attributes.category}
              </MenuItem>
            ))}
          </Select>
          <Box className="tw-mb-8 tw-flex tw-gap-4">
            <TextField
              label="Price"
              className="tw-w-full"
              type="number"
              onChange={handleChange}
              name={Type.PRICE}
            />
            <Select
              value="ten"
              label="Discount"
              className="tw-w-full"
              onChange={handleSelectDisscount}
            >
              <MenuItem value={10}>10%</MenuItem>
              <MenuItem value={20}>20%</MenuItem>
              <MenuItem value={30}>30%</MenuItem>
            </Select>
          </Box>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>product...</p>"
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
                  {state.file ? (
                    <Image
                      src={URL.createObjectURL(state.file)}
                      alt="file-image"
                      fill={false}
                      width={100}
                      height={100}
                      className="tw-h-24 tw-w-24 tw-object-cover"
                    />
                  ) : (
                    <ImageOutlined />
                  )}
                  <p>{state.file?.name || `Drag your file here`}</p>
                </Box>
              </Box>
            )}
          </Dropzone>
        </Box>
        <Box className="tw-flex tw-flex-col tw-gap-4">
          <TextField label="SKU" onChange={handleChange} name={Type.SKU} />
          <TextField
            label="Stock"
            type="number"
            onChange={handleChange}
            name={Type.STOCK}
          />
          <TextField label="Size" onChange={handleChange} name={Type.NAME} />
          <TextField label="Color" onChange={handleChange} name={Type.NAME} />
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_CATEGORY,
  });
  return {
    props: {
      categories: data.categories.data,
    },
  };
}
