import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductsCard = ({ product }) => {
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
    <Card
      sx={{
        maxWidth: 275,
      }}
    >
      <CardMedia
        component="img"
        height="auto"
        image={`${product?.images[0]?.url}`}
        alt={`${product?.name}`}
      />
      <CardContent>
        <Typography variant="h5">{product?.name}</Typography>
        <Typography variant="h7">Category: {product?.category}</Typography>
        <br />
        <Typography variant="h7">Price: ${product?.price}</Typography>
        <br />
        <Typography variant="h7">
          Status: {product?.stock >= 10 ? 'In Stock' : 'Out of Stock'}
        </Typography>
        <br />
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" fullWidth>
          Add to cart{' '}
          <ShoppingCartIcon sx={{ ml: 1 }} aria-label="add to cart" />
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
  );
};

export default ProductsCard;