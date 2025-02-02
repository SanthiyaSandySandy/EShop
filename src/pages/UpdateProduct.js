import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../redux/productSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);

  const product = products.find((p) => p.id === parseInt(productId));

  const productSchema = Yup.object().shape({
    name: Yup.string()
      .required("Product name is required")
      .test("unique-name", "Product name must be unique within the category", (value) =>
        products.every((p) => p.id === product.id || p.categoryId !== product.categoryId || p.name.toLowerCase() !== value?.toLowerCase())
      ),
    description: Yup.string(),
    stock: Yup.number().positive("Stock must be a positive number").required("Stock is required"),
    price: Yup.number().positive("Price must be a positive number").required("Price is required"),
    imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price,
      imageUrl: product.imageUrl,
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      dispatch(updateProduct({ id: product.id, categoryId: product.categoryId, ...values }));
      navigate(`/products/${product.categoryId}`);
    },
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Update Product</Typography>
      <form onSubmit={formik.handleSubmit} style={{display:'flex', flexDirection:'column'}}>
        <TextField  label="Product Name" {...formik.getFieldProps("name")} error={!!formik.errors.name} helperText={formik.errors.name} sx={{ width: 300 }}/>
        <TextField   margin="normal" label="Description" {...formik.getFieldProps("description")} error={!!formik.errors.description} helperText={formik.errors.description} sx={{ width: 300}}/>
        <TextField   margin="normal" label="Stock" type="number" {...formik.getFieldProps("stock")} error={!!formik.errors.stock} helperText={formik.errors.stock} sx={{ width: 300}}/>
        <TextField   margin="normal" label="Price" type="number" {...formik.getFieldProps("price")} error={!!formik.errors.price} helperText={formik.errors.price} sx={{ width: 300}}/>
        <TextField   margin="normal" label="Image URL" {...formik.getFieldProps("imageUrl")} error={!!formik.errors.imageUrl} helperText={formik.errors.imageUrl} sx={{ width: 300}}/>
        <Button type="submit" variant="contained" style={{width:'100px', marginTop:'10px'}}>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default UpdateProductPage;

