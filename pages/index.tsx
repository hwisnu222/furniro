import React from "react";
import Header from "@/components/headers/Header";
import { Button } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// images
import FurnitureImage from "../assets/images/furniture.png";
import BackgroundCor from "../assets/images/background.png";
import Footer from "@/components/footers/Footer";
import ProductLayout from "@/components/layouts/ProductLayout";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  centerMode: true,
  centerPadding: "60px",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function Index() {
  const [more, setMore] = React.useState(false);

  const handleMoreProduct = () => {
    setMore((prev: boolean) => !prev);
  };
  return (
    <>
      <Header />
      <div
        className="  tw-flex tw-h-[500px] tw-flex-col tw-items-end tw-justify-center tw-p-10"
        style={{
          backgroundImage: `url(${BackgroundCor.src})`,
          backgroundPosition: "center",
        }}
      >
        <div className=" tw-gap-4 tw-rounded-md tw-bg-default-100 tw-p-8">
          <h4 className="tw-mb-2 tw-text-xl tw-font-semibold">New Arrival</h4>
          <h3 className="tw-mb-4 tw-text-2xl tw-font-semibold">
            Discover Our New Collection
          </h3>
          <p className="tw-mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <Button
            variant="contained"
            size="large"
            className="tw-bg-default-200"
          >
            BUY Now
          </Button>
        </div>
      </div>

      <ProductLayout
        title="Browse The Range"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <Slider {...settings}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className="tw-w-full tw-cursor-pointer tw-bg-white"
              key={`browser-${index}`}
            >
              <Image
                src={FurnitureImage}
                alt="thumbnail"
                fill={false}
                className="tw-mb-4 md:tw-mx-4"
              />
              <p className="tw-font-bold">Living</p>
            </div>
          ))}
        </Slider>
      </ProductLayout>

      <ProductLayout title="Our Products">
        <div className="tw-mb-8 tw-grid tw-grid-cols-2 tw-gap-4 md:tw-grid-cols-4">
          {Array.from({ length: more ? 16 : 8 }).map((item, index) => (
            <section
              key={`product-${index}`}
              className="tw-gap-4 tw-bg-gray-200 tw-text-left"
            >
              <Image
                src={FurnitureImage}
                alt="products"
                fill={false}
                className="tw-w-full"
              />
              <div className="tw-p-4">
                <h3 className="tw-font-bold">Grifo</h3>
                <p className="tw-text-gray-500">Night lamp</p>
                <strong>Rp 1.500.000</strong>
              </div>
            </section>
          ))}
        </div>
        <Button variant="outlined" onClick={handleMoreProduct}>
          Show {more ? "Less" : "More"}
        </Button>
      </ProductLayout>
      <div className="tw-container tw-mx-auto tw-grid tw-grid-cols-1 tw-items-center tw-gap-4 tw-px-10 md:tw-grid-cols-2">
        <div>
          <h3 className="tw-text-2xl tw-font-bold">
            50+ Beautiful rooms inspiration
          </h3>
          <p className="tw-mb-8 md:tw-pr-4">
            Our exceptionally skilled designer has poured their creative
            brilliance into curating a diverse collection of stunning room
            prototypes, each meticulously crafted to evoke a unique blend of
            aesthetics, functionality, and allure.
          </p>
        </div>
        <div className="tw-grid tw-w-3/4 tw-grid-cols-2 tw-gap-2">
          <Image src={FurnitureImage} alt="inpisration" fill={false} />
          <Image
            src={FurnitureImage}
            alt="inpisration"
            fill={false}
            className="tw-w-full tw-pb-4"
          />
        </div>
      </div>

      {/* <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {Array.from({ length: 12 }).map((_, index) => (
            <Image
              key={`masonry-${index}`}
              src={FurnitureImage}
              alt="inspiration"
              fill={false}
              className=""
            />
          ))}
        </Masonry>
      </ResponsiveMasonry> */}

      <Footer />
    </>
  );
}
