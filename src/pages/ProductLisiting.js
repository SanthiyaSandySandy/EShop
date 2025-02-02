import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart} from "../redux/cartSlice";

const ProductListing = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);


  const filteredProducts = products.filter((p) => p.categoryId === parseInt(categoryId) && p.active);

  return (
    <>
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={2.5} key={product.id}>
          <Card sx={{padding: 2}}>
            <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
              <CardContent>
              <img src={product.imageUrl} alt="product-img" style={{height:'100px', width:"150px", objectFit:'contain'}}/>
              <hr/>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>Price: Rs.{product.price}</Typography>
              </CardContent>
            </CardActionArea>
            <Button variant="contained" onClick={() => dispatch(addToCart(product))} disabled={product.stock === 0}>
              Add to Cart
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default ProductListing;
