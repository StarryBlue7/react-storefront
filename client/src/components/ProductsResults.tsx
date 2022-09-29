import React from "react";
import { Container } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductsResults({ products }: any) {
  return (
    <Container sx={{ display: "flex", gap: 2 }}>
      {products.map((product: any) => (
        <ProductCard product={product} key={product} />
      ))}
    </Container>
  );
}
