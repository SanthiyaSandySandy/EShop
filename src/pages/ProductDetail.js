import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { Box, Button, Typography, Grid } from "@mui/material";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.products);

  const product = products.find((p) => p.id === parseInt(productId));
  const category = useSelector((state) => state.categories.categories.find((cat) => cat.id === parseInt(product?.categoryId)));

  const cartItem = cartItems.find((item) => item.id === parseInt(productId));
  const selectedQuantity = cartItem ? cartItem.quantity : 0;

  if (!cartItems) return <Typography>Category not found</Typography>;

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <>
    <Typography variant="h6" sx={{ my: 2 }}>
            {category ? `Categories/${category.name}/${product.name}` : "Category Not Found"}
          </Typography>
    <Box sx={{ padding: 2 }}>
      <Grid container xs={12} sx={{ display: "flex", flexDirectioin: "row" }}>
        <Grid
          xs={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ border: "1px solid black" }}
        >
          <img
            src={product.imageUrl}
            alt="product-img"
            style={{ height: "200px", width: "350px", objectFit: "contain" }}
          />
        </Grid>
        <Grid xs={6} spacing={2} padding={2}>
          <Typography variant="h4">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography>Price: Rs.{product.price}</Typography>
          {selectedQuantity === 0 ? (
            <Button
              variant="contained"
              onClick={() => dispatch(addToCart(product))}
              disabled={product.stock === 0}
            >
              Add To Cart
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => dispatch(addToCart(product))}
                disabled={product.stock === 0}
              >
                +
              </Button>
              {selectedQuantity}
              <Button
                variant="outlined"
                onClick={() => dispatch(removeFromCart(product.id))}
                disabled={product.stock === 0}
              >
                -
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default ProductDetail;

// import React from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/cartSlice";
// import { Box, Button, Typography, Grid } from "@mui/material";

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const dispatch = useDispatch();
//   const products = useSelector((state)=>state.products.products)

//   const product = products.find((p) => p.id === parseInt(productId));

//   if (!product) {
//     return <Typography>Product not found</Typography>;
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Grid container xs={12} sx={{display:'flex', flexDirectioin:'row'}}>
//         <Grid xs={6} display="flex" justifyContent="center" alignItems="center" style={{border:'1px solid black'}}>
//         <img src={product.imageUrl} alt="product-img" style={{height:'200px', width:"350px", objectFit:'contain'}}/>
//         </Grid>
//         <Grid xs={6} spacing={2} padding={2}>
//         <Typography variant="h4">{product.name}</Typography>
//       <Typography>{product.description}</Typography>
//       <Typography>Price: ${product.price}</Typography>
//       <Typography>Stock: {product.stock}</Typography>
//       <Button variant="contained" onClick={() => dispatch(addToCart(product))} disabled={product.stock === 0}>
//         Add to Cart
//       </Button>
//         </Grid>
//       </Grid>

//     </Box>
//   );
// };

// export default ProductDetail;
