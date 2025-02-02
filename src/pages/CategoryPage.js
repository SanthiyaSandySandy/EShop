import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useSelector, useDispatch } from "react-redux";
import { toggleCategoryStatus, deleteCategory } from "../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Switch,
} from "@mui/material";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);
  const orders = useSelector((state) => state.orders.orders); 

  const getCategoryStock = (categoryId) => {
    return products
      .filter((product) => product.categoryId === categoryId)
      .reduce((total, product) => total + product.stock, 0);
  };


  const getCategorySales = (categoryId) => {
    return orders
      .flatMap((order) => order.items)
      .filter(
        (item) =>
          products.find((product) => product.id === item.id)?.categoryId ===
          categoryId
      )
      .reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <Box sx={{ padding: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Categories List</Typography>
        <Button
          variant="contained"
          sx={{ marginBottom: 2 }}
          onClick={() => navigate("/create-category")}
        >
          <AddIcon />
          Add Category
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Total Sales</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <img
                    src={category.imageUrl}
                    alt="img"
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer", color: "blue" }}
                  onClick={() => navigate(`/edit-product/${category.id}`)}
                >
                  {category.name}
                </TableCell>
                <TableCell>{getCategoryStock(category.id)}</TableCell>
                <TableCell>
                  Rs.{getCategorySales(category.id).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => dispatch(toggleCategoryStatus(category.id))}
                  >
                    <Switch
                      checked={category.active}
                      inputProps={{ "aria-label": "Image visibility switch" }} // Accessibility
                    />
                  </Button>
                  </TableCell>
                  <TableCell>
                  <Button
                    onClick={() => navigate(`/edit-category/${category.id}`)}
                  >
                    <EditNoteIcon style={{color:'lightgrey'}}/>
                  </Button>
                  <Button
                    onClick={() => dispatch(deleteCategory(category.id))}
                    disabled={getCategoryStock(category.id) > 0}
                  >
                    <DeleteIcon style={{color:'red'}}/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CategoryPage;
