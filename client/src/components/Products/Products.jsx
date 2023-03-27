import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productAction';
import { Loader } from '../Shared';
import ProductsCard from './ProductsCard';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Products = () => {
  const dispatch = useDispatch();

  const categories = ['Cricket', 'Football'];

  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);
  const [drawierStatus, setDrawerStatus] = useState({
    left: false,
  });

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerStatus({ ...drawierStatus, [anchor]: open });
  };

  const setCurrentPageNo = (e, value) => {
    setCurrentPage(value);
  };

  const priceRangeHandler = (e, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const RatingsHandler = (e, selectedRatings) => {
    setRatings(selectedRatings);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, priceRange, category, ratings));
  }, [dispatch, keyword, currentPage, priceRange, category, ratings, error]);

  return (
    <>
      <Container
        id="products"
        display="flex"
        // justifyContent="center"
        justifycontent="center"
        sx={{
          p: 4,
        }}
      >
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
              name="keyword"
              value={keyword}
              onInput={(e) => setKeyword(e.target.value)}
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
            />
          </form>
          <Button
            variant="text"
            title="Filter"
            sx={{
              ml: -2,
              fontSize: '14px',
            }}
            onClick={toggleDrawer('left', true)}
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

          <Drawer
            anchor={'left'}
            open={drawierStatus['left']}
            onClose={toggleDrawer('left', false)}
          >
            <Box
              sx={{
                width: 280,
              }}
              role="presentation"
              // onClick={toggleDrawer('left', false)}
              // onKeyDown={toggleDrawer('left', false)}
            >
              {/* price */}
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Price</Typography>
                <Slider
                  aria-labelledby="range-slider"
                  getAriaLabel={() => 'Price range'}
                  value={priceRange}
                  onChange={priceRangeHandler}
                  valueLabelDisplay="auto"
                  // getAriaValueText={valuetext}
                  // step={100}
                  // marks
                  min={1}
                  max={500}
                  sx={{ ml: 2, width: 200 }}
                />
              </Box>
              {/* category */}
              <Box sx={{ paddingX: 2 }}>
                <Typography variant="h6">Category</Typography>
                <List>
                  {categories.map((cat, idx) => (
                    <ListItem key={idx}>
                      <ListItemText
                        onClick={() => {
                          // console.log(cat);
                          setCategory(cat);
                        }}
                      >
                        {cat}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
              {/* Ratings */}
              <Box sx={{ paddingX: 2 }}>
                <Typography variant="h6">Ratings</Typography>
                <Slider
                  aria-labelledby="continuous-slider"
                  getAriaLabel={() => 'Ratings range'}
                  value={ratings}
                  onChange={RatingsHandler}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  sx={{ ml: 2, width: 200 }}
                />
              </Box>
            </Box>
          </Drawer>
        </Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Grid
              container
              spacing={{
                xs: 2,
                md: 3,
              }}
              justifyContent="center"
              sx={{
                margin: `20px 4px 10px 4px`,
              }}
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
            {resultPerPage < count && (
              <Pagination
                sx={{
                  mt: 2,
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                size="small"
                count={productsCount / resultPerPage}
                page={currentPage}
                onChange={setCurrentPageNo}
                // variant="outlined"
                // shape="rounded"
                shape="circular"
              />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Products;
