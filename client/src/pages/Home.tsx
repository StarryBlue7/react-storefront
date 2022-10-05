import React from "react";
import ProductsResults from "../components/ProductsResults";
import PromoCarousel from "../components/PromoCarousel";
import TagList from "../components/TagList";

/**
 * Homepage component
 */
export default function Home() {
  return (
    <>
      <PromoCarousel />
      <TagList />
      <ProductsResults />
    </>
  );
}
