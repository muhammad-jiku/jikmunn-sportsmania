import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Rating,
  styled,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const ProductsCard = ({ product, idx }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
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
      <Card
        sx={{
          maxWidth: 225,
        }}
      >
        <CardMedia
          component="img"
          height="275px"
          image={`${product?.images[0]?.url}`}
          alt={`${product?.name}`}
        />
        <CardContent>
          <Typography variant="h5">{product?.name}</Typography>
          <Typography variant="h7">Category: {product?.category}</Typography>
          <br />
          <Typography variant="h7">Price: ${product?.price}</Typography>
          <br />
          <Typography
            variant="h7"
            sx={{
              ml: -1,
            }}
          >
            <Rating
              name="half-rating-read"
              defaultValue={product?.ratings}
              precision={0.5}
              readOnly
            />
          </Typography>
          <br />
          <Typography variant="h7">
            Status:{' '}
            {product?.stock <= 10 ? (
              <Typography variant="span" color={'red'}>
                Out of Stock{' '}
              </Typography>
            ) : (
              <Typography variant="span" color={'green'}>
                In Stock{' '}
              </Typography>
            )}
          </Typography>
          <br />
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              fontSize: '12px',
            }}
            onClick={() => navigate(`/product/${product?._id}`)}
          >
            Add to cart{' '}
            <ShoppingCartIcon
              sx={{
                ml: 1,
              }}
              aria-label="add to cart"
            />
          </Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>{product?.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default ProductsCard;
