import React from "react";
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
};

type Props = {
  title?: string;
  tags?: string[];
  exclude?: string | string[];
};

const styles = {
  slide: {
    width: "20%",
  },
  card: {
    marginBottom: 30,
  },
};

/**
 * Carousel of products
 */
export default function ProductsCarousel({ title, tags, exclude }: Props) {
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
                {products.map((product: Product, i: number) =>
                  // Exclude products with id(s) given as exclude value or exclude array
                  product._id === exclude || exclude?.includes(product._id) ? (
                    <></>
                  ) : (
                    <SwiperSlide style={styles.slide} key={i}>
                      <ProductCard
                        compact
                        product={product}
                        key={product._id}
                        style={styles.card}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
