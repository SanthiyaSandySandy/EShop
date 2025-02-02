import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const products = useSelector((state) => state.products.products);

  const productSchema = Yup.object().shape({
    name: Yup.string()
      .required("Product name is required")
      .test(
        "unique-name",
        "Product name must be unique in this category",
        (value) =>
          products.every(
            (product) =>
              product.categoryId !== parseInt(categoryId) ||
              product.name !== value
          )
      ),
    description: Yup.string().required("Product Description is required"),
    stock: Yup.number()
      .positive("Stock must be a positive number")
      .required("Stock is required"),
    price: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      stock: "",
      price: "",
      imageUrl: "",
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      const newProduct = {
        id: Date.now(),
        categoryId: parseInt(categoryId),
        ...values,
        active: true,
      };
      dispatch(addProduct(newProduct));
      navigate(`/edit-product/${categoryId}`);
    },
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Add Product</Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          margin="normal"
          label="Product Name"
          name="Product Name"
          {...formik.getFieldProps("name")}
          error={!!formik.errors.name}
          helperText={formik.errors.name}
          sx={{
            width: 300
          }}
        />
        <TextField
          margin="normal"
          label="Product Description"
          {...formik.getFieldProps("description")}
          error={!!formik.errors.description}
          helperText={formik.errors.description}
          sx={{ width: 300 }}
        />
        <TextField
          margin="normal"
          label="Stock"
          type="number"
          {...formik.getFieldProps("stock")}
          error={!!formik.errors.stock}
          helperText={formik.errors.stock}
          sx={{ width: 300 }}
        />
        <TextField
          margin="normal"
          label="Price"
          type="number"
          {...formik.getFieldProps("price")}
          error={!!formik.errors.price}
          helperText={formik.errors.price}
          sx={{ width: 300 }}
        />
        <TextField
          margin="normal"
          label="Image URL"
          {...formik.getFieldProps("imageUrl")}
          error={!!formik.errors.imageUrl}
          helperText={formik.errors.imageUrl}
          sx={{ width: 300 }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{ width: "100px", marginTop: "10px" }}
        >
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateProduct;
