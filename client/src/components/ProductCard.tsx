import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Chip, Box } from "@mui/material";

export default function ProductCard({ product }: any) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexFlow: "column" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="280"
          image={product.imgURL}
          alt={product.fullName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.shortName}
          </Typography>
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              mb: 1,
            }}
          >
            {product.tags.map((tag: any, i: number) => (
              <Chip
                key={i}
                label={tag.name}
                variant="outlined"
                size="small"
                onClick={() => {}}
                sx={{ mr: 0.5 }}
              />
            ))}
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
