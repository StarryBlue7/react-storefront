import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  compactImg: {
    height: 200,
  },
  img: {
    height: 280,
  },
};

export default function ProductCard({ product, compact }: any) {
  return (
    <Card
      sx={{
        height: "99%",
        width: "100%",
        borderRadius: 4,
        display: "flex",
        flexFlow: "column",
      }}
    >
      <Link to={"/products/" + product._id} style={{ textDecoration: "none" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            style={compact ? styles.compactImg : styles.img}
            image={product.imgURL}
            alt={product.fullName}
          />
          <CardContent>
            <Typography
              color="primary"
              align={"left"}
              variant="h5"
              component="div"
            >
              {product.shortName}
            </Typography>
            <Typography
              color="primary"
              align={"left"}
              variant={compact ? "subtitle2" : "body1"}
              component="div"
            >
              {"$" + product.price}
            </Typography>
            {!compact && (
              <>
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
              </>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
