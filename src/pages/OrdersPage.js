import React, { useEffect } from "react";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";
import { useSelector } from "react-redux";

const OrdersPage = () => {
  const orders = useSelector((state) => state.orders?.orders || []);

  useEffect(() => {
    console.log("Orders from Redux:", orders); 
  }, [orders]);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>
        Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography>No orders placed yet.</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order.id} sx={{ mb: 2 }}>
            <CardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Total: Rs.{order.totalAmount}/-
                </Typography>
              </div>
              <Typography>Items</Typography>
              {order.items.map((item) => (
                <Grid xs={12} style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    src={item.imageUrl}
                    alt="img"
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "contain",
                    }}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between", width:'100%' }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography key={item.id}>{item.name}</Typography>
                      <Typography key={item.id}>
                        Rs.{item.price * item.quantity}
                      </Typography>
                    </div>
                    <div>
                      <Typography key={item.id}>
                        {item.quantity} x {item.price} = {item.quantity * item.price}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrdersPage;

