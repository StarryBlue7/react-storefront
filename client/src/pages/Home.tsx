import React from "react";
import ProductsResults from "../components/ProductsResults";
import PromoCarousel from "../components/PromoCarousel";
import TagList from "../components/TagList";

/**
 * Homepage component
 */
export default function Home({ tagStates, categoryStates, cartHandler }: any) {
  return (
    <>
      <PromoCarousel />
      <TagList tagStates={tagStates} />
      <ProductsResults
        tagStates={tagStates}
        categoryStates={categoryStates}
        cartHandler={cartHandler}
      />
    </>
  );
}
