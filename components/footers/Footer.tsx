import React from "react";
import { Input, Divider, Box } from "@mui/material";
import Container from "../layouts/Container";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { ADD_NEWSLETTER } from "@/graphql/mutations/newsletter.mutation";
import { enqueueSnackbar } from "notistack";

export default function Footer() {
  const [email, setEmail] = React.useState("");
  const [createNewsletter] = useMutation(ADD_NEWSLETTER);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event?.target.value);
  };

  const hanndleCreateNewsletter = () => {
    createNewsletter({
      variables: {
        data: {
          email,
        },
      },
      onCompleted: () => {
        setEmail("");
        enqueueSnackbar("Your email is on our Newsletter list!", {
          variant: "success",
        });
      },
      onError: () => {
        enqueueSnackbar("Failed save your email!", { variant: "error" });
      },
    });
  };
  return (
    <Container className="tw-mt-6">
      <div className="tw-mb-4 tw-grid tw-grid-cols-1 tw-gap-8 tw-text-center md:tw-grid-cols-3 md:tw-text-left">
        <div>
          <h4 className="tw-text-xl tw-font-bold md:tw-mb-8">Funiro.</h4>
          <p className="tw-text-gray-300">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
        </div>
        <div>
          <h4 className="tw-font-bold tw-text-gray-300 md:tw-mb-8">Links</h4>
          <ul className="tw-flex tw-flex-col tw-gap-8 tw-font-bold">
            <li>
              <Link href="/" className="hover:tw-text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:tw-text-gray-600">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:tw-text-gray-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:tw-text-gray-600">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:tw-text-gray-600">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="tw-font-bold tw-text-gray-300 md:tw-mb-8">
            Newsletter
          </h4>
          <div className="tw-flex tw-flex-col md:tw-flex-row">
            <Input
              value={email}
              type="email"
              className="tw-mr-2 tw-text-gray-400"
              placeholder="Enter Your Email Address"
              onChange={handleOnChange}
            />
            <Box
              className="tw-cursor-pointer tw-border-b-2 tw-border-black tw-py-4  tw-font-bold tw-uppercase tw-text-black hover:tw-text-gray-800"
              onClick={hanndleCreateNewsletter}
            >
              Subscribe
            </Box>
          </div>
        </div>
      </div>

      <Divider />
      <div className="tw-p-4">
        <span>2023 furino. All rights reverved</span>
      </div>
    </Container>
  );
}
