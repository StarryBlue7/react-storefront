import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function ProductCard({ product }: any) {
  return (
    <Card sx={{ height: 450 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={product.imgURL}
          alt={product.fullName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.shortName}
          </Typography>
          <Typography
            variant="body2"
            textOverflow={"ellipsis"}
            noWrap
            color="text.secondary"
          >
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
