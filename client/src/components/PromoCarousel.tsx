import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/swiper.css";

const styles = {
  carousel: {
    maxHeight: "30vh",
  },
  images: {
    maxHeight: "30vh",
  },
};

const promos = [
  "https://m.media-amazon.com/images/S/aplus-media/vc/d3f96e4f-1a77-4ae6-8ed9-3657d4b81638.jpg",
  "https://images-na.ssl-images-amazon.com/images/I/817T1SewC9L._AC_SL1500_.jpg",
  "https://images-na.ssl-images-amazon.com/images/I/61MYox-EU%2BL._AC_UL1250_.jpg",
];

function PromoCarousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={styles.carousel}
      >
        {promos.map((image) => (
          <SwiperSlide>
            <img alt={"product promo"} style={styles.images} src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default PromoCarousel;
