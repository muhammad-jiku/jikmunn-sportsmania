//  external imports
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import FilterListIcon from '@mui/icons-material/FilterList';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
//  internal imports
import { Loader } from '../../Shared';
import ProductsCard from './ProductsCard';
import { clearErrors, getProducts } from '../../../actions/productAction';

const Products = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const categories = [
    'Football',
    'Cricket',
    'Golf',
    'Racing',
    'Tennis',
    'Badminton',
    'Swimming',
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);
  const [drawierStatus, setDrawerStatus] = useState({
    left: false,
  });
  const [isChecked, setIsChecked] = useState(false);

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

  const categoryHandler = (e) => {
    e.preventDefault();
    setIsChecked(e.target.checked);
    if (isChecked === true) {
      setCategory(e.target.value);
    } else {
      setCategory('');
    }
  };

  const RatingsHandler = (e, selectedRatings) => {
    setRatings(selectedRatings);
  };

  const resetFilterHandler = (e) => {
    e.preventDefault();

    setCurrentPage(1);
    setPriceRange([0, 500]);
    setKeyword('');
    setCategory('');
    setRatings(0);
    setIsChecked(false);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, priceRange, category, ratings));
  }, [
    dispatch,
    keyword,
    currentPage,
    priceRange,
    category,
    ratings,
    error,
    alert,
  ]);

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
        {/*  Search */}
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginY: 2,
            paddingY: 2,
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {keyword && (
                      <IconButton color="primary" onClick={resetFilterHandler}>
                        <HighlightOffIcon />
                      </IconButton>
                    )}
                    <IconButton
                      color="primary"
                      onClick={toggleDrawer('left', true)}
                    >
                      <FilterListIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
          {/* Drawer */}
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
                <Typography variant="span">Price</Typography>
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
                <Typography variant="span">Category</Typography>
                <List>
                  {categories.map((cat, idx) => (
                    <ListItem key={idx}>
                      <ListItemText>
                        <Typography sx={{ fontSize: '14px' }}>
                          {' '}
                          <Checkbox
                            onChange={categoryHandler}
                            checked={
                              cat === category && isChecked === true
                                ? true
                                : false
                            }
                            value={cat}
                          />{' '}
                          {cat}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
              {/* Ratings */}
              <Box sx={{ paddingX: 2 }}>
                <Typography variant="span">Ratings</Typography>
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
              {/* Reset Filter */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2,
                }}
              >
                <Button
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                  variant="contained"
                  fullWidth
                  disabled={
                    keyword === '' &&
                    category === '' &&
                    currentPage === 1 &&
                    ratings === 0 &&
                    priceRange[0] === 0 &&
                    priceRange[1] === 500 &&
                    isChecked === false
                  }
                  onClick={resetFilterHandler}
                >
                  <FilterListOffIcon /> Clear Filter
                </Button>
              </Box>
            </Box>
          </Drawer>
        </Container>
        {/* Loading */}
        {loading ? (
          <Loader />
        ) : (
          <>
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
              {products?.map((product, idx) => (
                <ProductsCard product={product} key={product?._id} />
              ))}
            </Grid>
            {products?.length === 0 && (
              <Typography
                variant="span"
                color={'red'}
                display="flex"
                justifyContent="center"
                sx={{
                  mt: 3,
                }}
              >
                Sorry! No product found!!
              </Typography>
            )}
            {resultPerPage < count && (
              <Pagination
                sx={{
                  mt: 2,
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                size="small"
                count={
                  resultPerPage < count
                    ? Math.ceil(count / resultPerPage)
                    : Math.ceil(productsCount / resultPerPage)
                }
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
