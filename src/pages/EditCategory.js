import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../redux/categorySlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);

  const category = categories.find((c) => c.id === parseInt(categoryId));

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Category name is required")
      .test("unique-name", "Category name must be unique", (value) =>
        categories.every((c) => c.id === category.id || c.name.toLowerCase() !== value.toLowerCase())
      ),
    imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
  });

  const formik = useFormik({
    initialValues: { name: category.name, imageUrl: category.imageUrl },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      dispatch(updateCategory({ id: category.id, name: values.name, imageUrl: values.imageUrl }));
      navigate("/categories"); 
    },
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Update Category</Typography>
      <form onSubmit={formik.handleSubmit} style={{display:'flex', flexDirection:'column'}}>
        <TextField
          margin="normal"
          label="Category Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ width: 300 }}
        />
        <TextField
          margin="normal"
          label="Image URL"
          name="imageUrl"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
          helperText={formik.touched.imageUrl && formik.errors.imageUrl}
          sx={{ width: 300 }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 , width:'100px'}}>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default EditCategory;
