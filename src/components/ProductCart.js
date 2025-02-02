import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      dispatch(addToCart(product));
    }
  };

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          ${product.price} | Stock: {product.stock}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          sx={{ mt: 1 }}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
