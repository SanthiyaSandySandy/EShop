import React from "react";
import { AppBar, Toolbar, IconButton, Badge, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          E-Shop
        </Typography>
        <IconButton color="inherit" onClick={() => navigate("/cart")}>
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate("/categories")}>
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;