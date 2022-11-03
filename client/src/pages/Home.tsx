import React from "react";
import CategoryBreadcrumbs from "../components/categories/CategoryBreadcrumbs";
import ProductsResults from "../components/product/ProductsResults";
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
      <CategoryBreadcrumbs categoryStates={categoryStates} />
      <ProductsResults
        tagStates={tagStates}
        categoryStates={categoryStates}
        cartHandler={cartHandler}
      />
    </>
  );
}
