import React from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function ProductDetails() {
  const selectedProductId = useSelector(
    (state) => state.productsStore.productId
  );

  const products = useSelector((state) => state.productsStore.products);
  const selectedProduct = products.find(
    (item) => item.id === selectedProductId
  );

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardMedia
        component="img"
        height="400"
        image={selectedProduct.image}
        alt={selectedProduct.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          {selectedProduct.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedProduct.description}
        </Typography>
      </CardContent>
      <Rating value={selectedProduct.rating.rate} readOnly></Rating>
    </Card>
  );
}
