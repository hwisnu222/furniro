import Header from "@/components/Header";
import { Button } from "@mui/material";
import Image from "next/image";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// images
import FurnitureImage from "../assets/images/furniture.png";
import BackgroundCor from "../assets/images/background.png";
import Footer from "@/components/Footer";
import ProductLayout from "@/components/layouts/ProductLayout";

export default function Index() {
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
        <div className="tw-grid tw-grid-cols-1 tw-gap-12 md:tw-grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`browser-${index}`}
              className="tw-w-full tw-cursor-pointer"
            >
              <Image
                src={FurnitureImage}
                alt="thumbnail"
                fill={false}
                className="tw-mb-4"
              />
              <p className="tw-font-bold">Living</p>
            </div>
          ))}
        </div>
      </ProductLayout>
      <ProductLayout title="Our Products">
        <div className="tw-mb-8 tw-grid tw-grid-cols-2 tw-gap-4 md:tw-grid-cols-4">
          {Array.from({ length: 8 }).map((item, index) => (
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
        <Button variant="outlined">Show More</Button>
      </ProductLayout>

      <div className="tw-container tw-mx-auto tw-grid tw-grid-cols-1 tw-items-center tw-gap-4 tw-px-10 md:tw-grid-cols-2">
        <div>
          <h3 className="tw-text-2xl tw-font-bold">
            50+ Beautiful rooms inspiration
          </h3>
          <p className="tw-mb-8">
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
          <Button variant="contained" className="tw-bg-default-200">
            Explore More
          </Button>
        </div>
        <div className="tw-flex tw-w-3/4 tw-gap-2">
          <Image
            src={FurnitureImage}
            alt="inpisration"
            fill={false}
            className="tw-w-full"
          />
          <Image
            src={FurnitureImage}
            alt="inpisration"
            fill={false}
            className="tw-w-full"
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
