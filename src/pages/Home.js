import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import { Card, CardActionArea, CardContent, Typography, Grid } from "@mui/material";


const Home = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);

  return (
    <>
    <h1>Categories</h1>
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={3} key={category.id}>
          <Card  style={{justifyContent:'center', alignItems:'center', alignContent:'center'}}>
            <CardActionArea onClick={() => navigate(`/products/${category.id}`)}>
              <CardContent>
                <img src={category.imageUrl} alt="product-img" style={{height:'150px', width:"200px", objectFit:'cover'}}/>
                <hr/>
                <Typography variant="h6">{category.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default Home;