import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductsCard = ({ product, idx }) => {
  const navigate = useNavigate();

  return (
    <Grid
      item
      key={idx}
      xs={6}
      sm={3}
      md={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Card
        sx={{
          cursor: 'pointer',
          maxHeight: 600,
          overflow: 'hidden',
          borderRadius: '10px',
          boxSizing: 'border-box',
          '&:hover': {
            boxShadow: '5px 5px 20px black',
            transition: '0.5s',
          },
        }}
      >
        <CardMedia
          component="img"
          height="350px"
          // width="320px"
          image={`${product?.images[0]?.url}`}
          alt={`${product?.name}`}
          sx={{
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
          }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {product?.name}
          </Typography>
          <Typography
            variant="span"
            textAlign="justify"
            sx={{ mt: 1, fontWeight: 400, fontSize: '12px' }}
          >
            {product?.description?.length === 35
              ? product?.description
              : product?.description?.slice(0, 35) + '...'}
          </Typography>
          <Typography variant="h7" sx={{ mt: 1, fontweight: 800 }}>
            ${product?.price}
          </Typography>

          <Rating
            name="half-rating-read"
            defaultValue={product?.ratings}
            precision={0.5}
            readOnly
            sx={{
              mt: 1,
            }}
          />
        </CardContent>
        <Button
          variant="contained"
          fullWidth
          sx={{
            p: 2,
            fontSize: '12px',
          }}
          onClick={() => navigate(`/product/${product?._id}`)}
        >
          Buy Now
        </Button>
      </Card>
    </Grid>
  );
};

export default ProductsCard;
