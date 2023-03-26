import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productAction';
import { Loader } from '../Shared';
import ProductsCard from './ProductsCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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
          <Container
            sx={{
              // width: 300,
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 2,
            }}
          >
            <form
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0 10px',
              }}
            >
              <TextField
                id="search-bar"
                className="text"
                onInput={(e) => {
                  // setSearchQuery(e.target.value);
                  console.log(e.target.value);
                }}
                label="Search Item..."
                variant="standard"
                placeholder="Search Item..."
                sx={{
                  width: {
                    xs: 180,
                    sm: 350,
                    md: 700,
                  },
                }}
                // fullWidth
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </form>
            {/* <IconButton type="submit" aria-label="search">
              <FilterAltIcon />{' '}
              <Typography
                variant="span"
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                }}
              >
                Filter
              </Typography>
            </IconButton> */}
            <Button
              variant="text"
              sx={{
                ml: -2,
                fontSize: '14px',
              }}
            >
              <FilterAltIcon />{' '}
              <Typography
                variant="span"
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                }}
              >
                Filter
              </Typography>
            </Button>
          </Container>
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
            <Pagination
              sx={{
                mt: 2,
              }}
              count={resultPerPage}
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              variant="outlined"
              shape="rounded"
            />
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Products;
