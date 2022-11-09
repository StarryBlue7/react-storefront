import React from "react";

import PromoCarousel from "../components/PromoCarousel";
import TagList from "../components/TagList";
import ProductsResults from "../components/product/ProductsResults";

type TagStates = {
  selectedTags: Set<string>;
  toggleTag: (tag: string) => () => void;
};

type Tag = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  fullName: string;
  shortName: string;
  modelNumber: string;
  imgURL: string;
  description: string;
  rating?: number;
  tags: Tag[];
  price: number;
};

type Item = {
  product: Product;
  quantity: number;
};

type Totals = {
  totalPrice: number;
  totalQty: number;
};

type CartHandler = {
  cartLoading: boolean;
  cart: Item[];
  totals: Totals;
  addToCart: (product: Product, quantity?: number) => () => void;
  updateQty: (productId: string, quantity: number) => () => void;
  deleteItem: (productId: string) => () => void;
  updateCart: (cart: Item[]) => () => void;
  clearAll: () => () => void;
};

type HomeProps = {
  tagStates: TagStates;
  cartHandler: CartHandler;
};

/**
 * Homepage component
 */
export default function Home({ tagStates, cartHandler }: HomeProps) {
  return (
    <>
      <PromoCarousel />
      <TagList tagStates={tagStates} />
      <ProductsResults tagStates={tagStates} cartHandler={cartHandler} />
    </>
  );
}
