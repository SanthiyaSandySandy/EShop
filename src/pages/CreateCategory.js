import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../redux/categorySlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Category name is required")
      .test("unique-name", "Category name must be unique", (value) =>
        categories.every(
          (category) => category.name.toLowerCase() !== value.toLowerCase()
        )
      ),
    imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", imageUrl: "" },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      const newCategory = {
        id: Date.now(),
        name: values.name,
        imageUrl: values.imageUrl,
        active: true,
      };
      dispatch(addCategory(newCategory));
      navigate("/categories");
    },
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Add Category</Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          margin="normal"
          label="Category Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ width: 300}}
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
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, width: "100px" }}
        >
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateCategory;
