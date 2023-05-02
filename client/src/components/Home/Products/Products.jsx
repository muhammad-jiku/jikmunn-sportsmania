import React, { useEffect } from 'react';
//  external imports
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Typography } from '@mui/material';
//  internal imports
import ProductsCard from '../../Products/Infos/ProductsCard';
import { getProducts, clearErrors } from '../../../actions/productAction';

const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <>
      <Container
        id="products"
        display="flex"
        justifycontent="center"
        sx={{
          p: 4,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="span"
            sx={{
              fontSize: '24px',
              fontWeight: 700,
            }}
            color="primary.main"
          >
            Our Products
          </Typography>
        </Box>
        <Grid
          container
          spacing={{
            xs: 2,
            md: 3,
          }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
          columns={{
            xs: 4,
            sm: 8,
            md: 12,
          }}
        >
          {products?.map((product) => (
            <ProductsCard product={product} key={product?._id} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Products;
