import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder, clearOrder } from "../redux/orderSlice";
import { updateStock } from "../redux/productSlice";
import { removeFromCart, addToCart, clearCart } from "../redux/cartSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!cartItems.length) return;
    dispatch(clearOrder());
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    dispatch(placeOrder({ items: cartItems, totalAmount }));
    dispatch(updateStock(cartItems));
    dispatch(clearCart());
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Your Cart</Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {cartItems.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} sx={{ marginBottom: 2 }}>
                <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid xs={9} sx={{ display: "flex", flexDirection: "row" }}>
                    <Grid xs={3}>
                      <img
                        src={item.imageUrl}
                        alt="product-img"
                        style={{
                          height: "50px",
                          width: "100px",
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                    <Grid xs={9}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography>Price: Rs.{item.price}</Typography>
                    </Grid>
                  </Grid>

                  <Grid xs={3}>
                    <Button
                      onClick={() => dispatch(addToCart(item))}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </Button>
                    <>{item.quantity}</>
                    <Button onClick={() => dispatch(removeFromCart(item.id))}>
                      -
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Summary</Typography>
              {cartItems.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
              ) : (
                cartItems.map((item) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6">{item.name}</Typography>
                    <div>
                      <Typography variant="h6">
                        {item.quantity} x {item.price}=
                        {item.quantity * item.price}
                      </Typography>
                    </div>
                  </div>
                ))
              )}
              <Typography variant="h6">
                Total Price: Rs.{totalPrice.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
