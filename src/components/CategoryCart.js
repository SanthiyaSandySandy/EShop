import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ cursor: "pointer" }} onClick={() => navigate(`/category/${category.id}`)}>
      <CardMedia component="img" height="140" image={category.image} alt={category.name} />
      <CardContent>
        <Typography variant="h6">{category.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
