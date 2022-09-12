import React from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import "./ProductDetails.css";

export default function ProductDetails() {
  const selectedProductId = useSelector(
    (state) => state.productsStore.productId
  );

  const products = useSelector((state) => state.productsStore.products);
  const selectedProduct = products.find(
    (item) => item.id === selectedProductId
  );

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h4" component="h2">
        Product details
      </Typography>
      <Card sx={{ maxWidth: 1200 }}>
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
          <Rating value={selectedProduct.rating.rate} readOnly></Rating>
        </CardContent>
      </Card>
    </Container>
  );
}
