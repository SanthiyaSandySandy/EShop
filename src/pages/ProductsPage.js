import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useSelector, useDispatch } from "react-redux";
import { toggleProductStatus, deleteProduct } from "../redux/productSlice";
import { useNavigate, useParams } from "react-router-dom";
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

const ProductsPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const orders = useSelector((state) => state.orders.orders);

  const filteredProducts = products.filter(
    (p) => p.categoryId === parseInt(categoryId)
  );

  const getProductSales = (productId) => {
    return orders
      .flatMap((order) => order.items)
      .filter((item) => item.id === productId)
      .reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <Box sx={{ padding: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Product List</Typography>
        <Button
          variant="contained"
          sx={{ marginBottom: 2 }}
          onClick={() => navigate(`/create-product/${categoryId}`)}
        >
          <AddIcon /> Add Product
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Available Stock</TableCell>
              <TableCell>Total Sales Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.imageUrl}
                    alt="img"
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell sx={{maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis',whiteSpace: 'nowrap' }}>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  Rs.{getProductSales(product.id).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => dispatch(toggleProductStatus(product.id))}
                  >
                    <Switch
                      checked={product.active}
                      inputProps={{ "aria-label": "Image visibility switch" }} // Accessibility
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => navigate(`/update-product/${product.id}`)}
                  >
                    <EditNoteIcon style={{ color: "lightgrey" }} />
                  </Button>
                  <Button
                    color="error"
                    onClick={() => dispatch(deleteProduct(product.id))}
                  >
                    <DeleteIcon style={{ color: "red" }} />
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

export default ProductsPage;