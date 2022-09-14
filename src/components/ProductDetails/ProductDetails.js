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

  const getSelectedProduct = (products) =>
    products.find((item) => item.id === Number(productId));

  useEffect(() => {
    // If store products is filled, find the seleted product in store data
    if (products) {
      const selectedProduct = getSelectedProduct(products);
      setProductDetails(selectedProduct);
      setLoading(false);

      // If store products is empty, fetch product details from api and set data in store productsDetails
    } else {
      const getProductDetails = async () => {
        const response = await axios.get(`products?_quantity=100`);
        setLoading(false);
        const { data } = response.data;
        const selectedProduct = getSelectedProduct(data);
        setProductDetails(selectedProduct);
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
            className="image-box"
          >
            <CardMedia
              component="img"
              height="400"
              width="400"
              image={productDetails.image}
              alt={productDetails.name}
              sx={{ objectFit: "contain" }}
            />
          </Box>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h5"
              sx={{ color: "#383838" }}
            >
              {productDetails.name}
            </Typography>
            <Box
              sx={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                margin: "1rem 0",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginRight: "1rem" }}
              >
                Tags:
              </Typography>
              {productDetails.tags.map((tag, i) => (
                <Chip label={tag} sx={{ margin: "0.2rem" }} />
              ))}
            </Box>
            <Typography
              variant="body1"
              className="price"
              sx={{ marginBottom: "0.5rem", color: "#383838" }}
            >
              Price: {productDetails.price}€
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ margin: "0.5rem 0", fontWeight: "bold" }}
            >
              Product description:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productDetails.description}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  } else {
    <Loader />;
  }
}
