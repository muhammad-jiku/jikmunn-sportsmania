import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts, clearErrors } from '../../../actions/productAction';
import ProductsCard from '../../Products/Infos/ProductsCard';

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
        {/* {console.log(products)} */}
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
