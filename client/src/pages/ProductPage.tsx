import React from "react";
import { Grid, Typography } from "@mui/material";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../utils/queries";

export default function ProductPage({ productId }: any) {
  const { loading, data } = useQuery(QUERY_PRODUCT, {
    variables: { productId },
    fetchPolicy: "no-cache",
  });

  const product = data?.product || {};
  return <></>;
}
