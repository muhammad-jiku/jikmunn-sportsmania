import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const categories = ['Cricket', 'Football'];

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
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

  console.log(match);

  //   const keyword = match.params.keyword;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerStatus({ ...drawierStatus, [anchor]: open });
  };

  // const list = (anchor) => (
  //   <Box
  //     sx={{
  //       width: 250,
  //     }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  const setCurrentPageNo = (e, value) => {
    // console.log(e.target.value);
    console.log(value);
    setCurrentPage(value);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

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
          {console.log(products, productsCount, resultPerPage, count)}

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
                onInput={(e) => {
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
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
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
                  width: 250,
                }}
                role="presentation"
                onClick={toggleDrawer('left', false)}
                onKeyDown={toggleDrawer('left', false)}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText>Inbox</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <MailIcon />
                      </ListItemIcon>
                      <ListItemText>Starred</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText>Send email</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <MailIcon />
                      </ListItemIcon>
                      <ListItemText>Drafts</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText>All mail</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <MailIcon />
                      </ListItemIcon>
                      <ListItemText>Trash</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText>Spam</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Container>
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
            <Pagination
              sx={{
                mt: 2,
              }}
              size="small"
              count={productsCount / resultPerPage}
              page={currentPage}
              onChange={setCurrentPageNo}
              // variant="outlined"
              // shape="rounded"
              shape="circular"
            />
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Products;
