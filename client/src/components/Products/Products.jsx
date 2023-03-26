import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productAction';
import { Loader } from '../Shared';
import ProductsCard from './ProductsCard';

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const categories = ['Cricket', 'Football'];

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('football');
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  console.log(match);

  //   const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

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
          {console.log(products, productsCount, resultPerPage)}

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
            // display="flex"
            // flexDirection={'column'}
            // alignItems="center"
            justifyContent="center"
            sx={{ margin: `20px 4px 10px 4px` }}
            columns={{
              xs: 4,
              sm: 8,
              md: 12,
            }}
          >
            {products?.map((product, idx) => (
              <Grid
                item
                key={idx}
                xs={6}
                sm={3}
                md={3}
                display="flex"
                flexDirection={'column'}
                alignItems="center"
              >
                <ProductsCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Products;
