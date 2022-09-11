import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import data from "../../data.json";

const selectedId = 1;

const selectedProduct = data.find((item) => item.id === selectedId);

export default function ProductDetails(props) {
  const { selectedId } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="auto"
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
