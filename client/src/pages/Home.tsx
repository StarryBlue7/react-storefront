import React from "react";

import PromoCarousel from "../components/PromoCarousel";
import TagList from "../components/TagList";
import ProductsResults from "../components/product/ProductsResults";

/**
 * Homepage component
 */
export default function Home({ tagStates, cartHandler }: any) {
  return (
    <>
      <PromoCarousel />
      <TagList tagStates={tagStates} />
      <ProductsResults tagStates={tagStates} cartHandler={cartHandler} />
    </>
  );
}
