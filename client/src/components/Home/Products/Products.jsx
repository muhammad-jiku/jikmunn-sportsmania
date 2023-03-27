import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearErrors } from '../../../actions/productAction';
import { Loader } from '../../Shared';
import ProductsCard from '../../Products/ProductsCard';

const Products = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container
          id="products"
          display="flex"
          // justifyContent="center"
          justifycontent="center"
          sx={{
            p: 4,
          }}
        >
          {console.log(products)}
          <Typography
            variant="h4"
            sx={{
              mb: 2,
            }}
          >
            Our Products
          </Typography>
          <Grid
            container
            spacing={{
              xs: 2,
              md: 3,
            }}
            sx={{ margin: `20px 4px 10px 4px` }}
            columns={{
              xs: 4,
              sm: 8,
              md: 12,
            }}
          >
            {products?.map((product, idx) => (
              <ProductsCard product={product} idx={idx} />
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Products;
