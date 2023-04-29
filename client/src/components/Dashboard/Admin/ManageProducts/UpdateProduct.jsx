import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from '../../../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../../../constants/productConstant';
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
import HeightIcon from '@mui/icons-material/Height';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import { Loader } from '../../../Shared';

const UpdateProduct = () => {
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState(product ? product?.name : '');
  const [price, setPrice] = useState(product ? product?.price : 0);
  const [description, setDescription] = useState(
    product ? product?.description : ''
  );
  const [category, setCategory] = useState(product ? product?.category : '');
  const [size, setSize] = useState(product ? product?.size : '');
  const [stock, setStock] = useState(product ? product?.stock : 0);
  const [oldImages, setOldImages] = useState([]);
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

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  useEffect(() => {
    if (product && product?._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product?.name);
      setPrice(product?.price);
      setDescription(product?.description);
      setCategory(product?.category);
      setSize(product?.size);
      setStock(product?.stock);
      setOldImages(product?.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Product Updated Successfully');
      navigate('/dashboard/admin/products');
      dispatch({
        type: UPDATE_PRODUCT_RESET,
      });
    }
  }, [dispatch, alert, id, error, updateError, navigate, isUpdated, product]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('size', size);
    myForm.set('stock', stock);

    images.forEach((image) => {
      myForm.append('images', image);
    });
    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            p: 2,
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
          {product && (
            <>
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
                Update {product?.name}
              </Typography>

              <Box
                sx={{
                  p: 2,
                  ml: {
                    xs: 0,
                    md: 6,
                  },
                }}
                component="form"
                noValidate
                autoComplete="off"
                // encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
              >
                {/* Name */}
                <TextField
                  sx={{ mt: 0.5 }}
                  label="Name"
                  fullWidth
                  required
                  type="text"
                  placeholder="Name"
                  defaultValue={name}
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
                  defaultValue={price}
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
                  defaultValue={description}
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

                {/*  Size */}
                <TextField
                  sx={{ mt: 2, pt: 1 }}
                  select
                  fullWidth
                  label="Size"
                  placeholder="Size"
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HeightIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  {sizes.map((sz) => (
                    <MenuItem
                      key={sz}
                      value={sz}
                      label="Size"
                      placeholder="Size"
                    >
                      {sz || 'Choose Size'}
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
                  defaultValue={stock}
                  onChange={(e) => setStock(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StorageIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                {/*  Product Images */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mt: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {oldImages &&
                      oldImages?.map((image, index) => (
                        <img
                          key={index}
                          src={image?.url}
                          alt="Old Product Preview"
                          height={50}
                        />
                      ))}

                    {imagesPreview?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Product Preview"
                        height={50}
                      />
                    ))}
                  </Box>

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
                      onChange={updateProductImagesChange}
                      hidden
                      multiple
                    />
                  </Button>
                  {/* <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProductImagesChange}
                    multiple
                  /> */}
                </Box>

                <Button
                  sx={{ p: 1, mt: 2 }}
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Update
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default UpdateProduct;
