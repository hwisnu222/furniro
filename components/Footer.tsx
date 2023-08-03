import React from "react";
import { Input, Divider, Button } from "@mui/material";
import Container from "./layouts/Container";
import Link from "next/link";

export default function Footer() {
  return (
    <Container className="tw-mt-6">
      <div className="tw-mb-4 tw-grid tw-grid-cols-1 tw-gap-4 tw-text-center md:tw-grid-cols-4 md:tw-text-left">
        <div>
          <h4 className="tw-mb-8 tw-text-xl tw-font-bold">Funiro.</h4>
          <p className="tw-text-gray-300">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
        </div>
        <div>
          <h4 className="tw-mb-8 tw-font-bold tw-text-gray-300">Links</h4>
          <ul className="tw-flex tw-flex-col tw-gap-8 tw-font-bold">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="tw-mb-8 tw-font-bold tw-text-gray-300">Help</h4>
          <ul className="tw-flex tw-flex-col tw-gap-8 tw-font-bold">
            <li>Payment Options</li>
            <li>Returns</li>
            <li>Privacy Policies</li>
          </ul>
        </div>
        <div>
          <h4 className="tw-mb-8 tw-font-bold tw-text-gray-300">Newsletter</h4>
          <div className="tw-flex tw-flex-col md:tw-flex-row">
            <Input
              className="tw-text-gray-400"
              placeholder="Enter Your Email Address"
            />
            <Button>Subscribe</Button>
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
