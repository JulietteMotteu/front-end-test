import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Container,
  Box,
  Typography,
  Rating,
  Chip,
} from "@mui/material";
import Loader from "../Loader/Loader";
import axios from "../../api/axios";
import "./ProductDetails.css";

export default function ProductDetails() {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});

  // Get url productId param
  const { productId } = useParams();

  const products = useSelector((state) => state.productsStore.products);

  useEffect(() => {
    // If store products is filled, find the seleted product in store data
    if (products) {
      const selectedProduct = products.find(
        (item) => item.id === Number(productId)
      );
      setProductDetails(selectedProduct);
      setLoading(false);

      // If store products is empty, fetch product details from api and set data in store productsDetails
    } else {
      const getProductDetails = async () => {
        const response = await axios.get(`products/${productId}`);
        setLoading(false);
        const { data } = response;
        setProductDetails(data);
        return data;
      };
      getProductDetails().catch(console.error);
    }
  }, []);

  if (!loading) {
    return (
      <Container
        maxWidth="lg"
        className="product-page"
        sx={{ marginTop: "2rem" }}
      >
        <Typography gutterBottom variant="h4" component="h2">
          <span className="colored-text">Product </span> details
        </Typography>
        <Card sx={{ maxWidth: 1200, boxShadow: "unset", gap: "2rem" }}>
          <Box
            sx={{
              height: "auto",
              width: "100%",
              maxWidth: 600,
            }}
          >
            <CardMedia
              component="img"
              height="400"
              width="400"
              image={productDetails.image}
              alt={productDetails.title}
              sx={{ objectFit: "contain" }}
            />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h5">
              {productDetails.title}
            </Typography>
            <Chip
              label={productDetails.category}
              sx={{ margin: "0.5rem 0 1rem" }}
            />
            <Typography
              variant="body1"
              className="price"
              sx={{ marginBottom: "0.5rem" }}
            >
              {productDetails.price}€
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productDetails.description}
            </Typography>
            <Box
              sx={{
                height: "auto",
                width: "auto",
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Reviews:
              </Typography>
              <Rating value={productDetails.rating.rate} readOnly></Rating>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  } else {
    <Loader />;
  }
}
