import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProduct } from '../../../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../../../constants/productConstant';
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';

const NewProduct = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Football',
    'Cricket',
    'Golf',
    'Racing',
    'Tennis',
    'Badminton',
    'Swimming',
  ];

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate('/dashboard/admin/products');
      dispatch({
        type: NEW_PRODUCT_RESET,
      });
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('stock', stock);

    images.forEach((image) => {
      myForm.append('images', image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: {
          xs: 'auto',
          md: '70%',
        },
      }}
    >
      <Typography
        variant="p"
        color="primary"
        textAlign="center"
        sx={{
          mt: 2,
          fontSize: '24px',
          fontWeight: 800,
        }}
      >
        Add New Product
      </Typography>

      {/* Form */}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        // encType="multipart/form-data"
        onSubmit={createProductSubmitHandler}
        sx={{
          p: 2,
          ml: {
            xs: 0,
            md: 6,
          },
        }}
      >
        {/*   Name */}
        <TextField
          sx={{ mt: 0.5 }}
          label="Name"
          fullWidth
          required
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SpellcheckIcon />
              </InputAdornment>
            ),
          }}
        />

        {/*  Price */}
        <TextField
          sx={{ mt: 2, pt: 1 }}
          label="Price"
          fullWidth
          required
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
        />

        {/*  Desc */}
        <TextField
          sx={{ mt: 2, pt: 1 }}
          multiline
          rows={3}
          fullWidth
          required
          label={'Description'}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/*  Category */}
        <TextField
          sx={{ mt: 2, pt: 1 }}
          select
          fullWidth
          label="Category"
          placeholder="Category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountTreeIcon />
              </InputAdornment>
            ),
          }}
        >
          {categories.map((cate) => (
            <MenuItem
              key={cate}
              value={cate}
              label={'Category'}
              placeholder={'Category'}
            >
              {cate || 'Choose Category'}
            </MenuItem>
          ))}

          {/* <option value="">Choose Category</option>
          {categories.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))} */}
        </TextField>

        {/*  Stock */}
        <TextField
          sx={{ mt: 2, pt: 1 }}
          label="Stock"
          fullWidth
          required
          type="number"
          placeholder="Stock"
          onChange={(e) => setStock(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StorageIcon />
              </InputAdornment>
            ),
          }}
        />

        {/*  Images */}
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{
            p: 1.8,
            mt: 2,
            cursor: 'pointer',
          }}
        >
          Choose Product Images
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={createProductImagesChange}
            multiple
            hidden
          />
        </Button>

        {/* <TextField
          sx={{ mt: 2, pt: 1 }}
          fullWidth
          type="file"
          name="avatar"
          accept="image/*"
          onChange={createProductImagesChange}
          multiple
        /> */}

        {imagesPreview.map((image, index) => (
          <img key={index} src={image} alt="Product Preview" height={75} />
        ))}

        <Button
          sx={{ p: 1, mt: 2 }}
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading ? true : false}
        >
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

export default NewProduct;
