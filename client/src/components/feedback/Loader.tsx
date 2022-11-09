import React from "react";

import { CircularProgress, Grid, Typography } from "@mui/material";

type LoaderProps = {
  message?: string;
};

export default function Loader({ message = "Loading..." }: LoaderProps) {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        minHeight: "40vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
      <Typography>{message}</Typography>
    </Grid>
  );
}
