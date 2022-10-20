import React, { ReactElement } from "react";
import { Grid, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import ProductCard from "./ProductCard";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import "../styles/swiper.css";

type Product = {
  _id: string;
  fullName: string;
  shortName: string;
  imgURL: string;
  description: string;
  tags: string[];
  price: number;
};

type CarouselProps = {
  title?: string;
  tags?: string[];
  exclude?: string | string[];
};

const styles = {
  slide: {
    height: "auto",
    overflow: "visible",
  },
};

/**
 * Carousel of products
 */
export default function ProductsCarousel({
  title,
  tags,
  exclude,
}: CarouselProps) {
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: {
      tags: tags || null,
    },
    fetchPolicy: "no-cache",
  });

  const products = data?.products || [];

  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {title && (
              <Grid item>
                <Typography variant="h5">{title}</Typography>
              </Grid>
            )}
            <Grid item width={"100%"}>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
                centeredSlidesBounds={true}
                navigation={true}
                rewind={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {products.reduce(
                  (
                    filteredProducts: Array<ReactElement>,
                    product: Product,
                    i: number
                  ) => {
                    // Exclude products with id(s) given as exclude value or exclude array
                    if (
                      product._id === exclude ||
                      exclude?.includes(product._id)
                    ) {
                      return filteredProducts;
                    }
                    filteredProducts.push(
                      <SwiperSlide style={styles.slide} key={i}>
                        <ProductCard
                          compact
                          product={product}
                          key={product._id}
                        />
                      </SwiperSlide>
                    );
                    return filteredProducts;
                  },
                  []
                )}
              </Swiper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
