import React from "react";

import Benefite from "@/components/footers/Benefite";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import HeaderProduct from "@/components/headers/HeaderProduct";
import Container from "@/components/layouts/Container";
import { Button, TextField } from "@mui/material";
import { AccessTime, LocalPhone, LocationOn } from "@mui/icons-material";

export default function contact() {
  return (
    <>
      <Header />
      <HeaderProduct
        title="Contact"
        paths={[{ label: "Contact", url: "/contact" }]}
      />
      <Container className="tw-p-8">
        <div className="tw-flex tw-flex-col tw-items-center">
          <h3 className="tw-text-2xl  tw-font-bold">Get In Touch With Us</h3>
          <p className="tw-mb-8 tw-text-center tw-text-gray-400 md:tw-w-1/2">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>
        <div className="tw-flex tw-flex-col tw-items-start tw-justify-center tw-gap-4 md:tw-flex-row">
          <div className="md:tw- grid tw-w-full md:tw-w-1/4 md:tw-grid-cols-1 md:tw-pr-8">
            <div className="tw-mb-8 tw-flex">
              <LocationOn className="tw-mr-2" />
              <div>
                <h3 className="tw-font-bold">Address</h3>
                <p className="tw-text-sm">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>
            <div className="tw-mb-8 tw-flex">
              <LocalPhone className="tw-mr-2" />
              <div>
                <h3 className="tw-font-bold">Phone</h3>
                <p className="tw-text-sm">Mobile: +(84) 546-6789</p>
                <p className="tw-text-sm">Hotline: +(84) 456-6789</p>
              </div>
            </div>
            <div className="tw-mb-8 tw-flex">
              <AccessTime className="tw-mr-2" />
              <div>
                <h3 className="tw-font-bold">Working Time</h3>
                <p className="tw-text-sm">Monday-Friday: 9:00 - 22:00</p>
                <p className="tw-text-sm">Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>
          <div className="tw-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-w-1/2">
            <TextField label="Your Name" className="tw-w-full" />
            <TextField label="Email Address" className="tw-w-full" />
            <TextField label="Subject" className="tw-w-full" />
            <TextField
              label="Message"
              multiline={true}
              className="tw-mb-8 tw-w-full"
            />
            <Button
              variant="contained"
              className="tw-inline-block tw-bg-default-200"
            >
              Submit
            </Button>
          </div>
        </div>
      </Container>

      <Benefite />
      <Footer />
    </>
  );
}
