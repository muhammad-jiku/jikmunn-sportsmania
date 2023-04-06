import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors } from '../../actions/productAction';
import { ErrorNotFound, Loader } from '../Shared';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  console.log(product);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  return (
    <>
      {id !== product?._id && <ErrorNotFound />}
      {loading ? (
        <Loader />
      ) : (
        <>
          {console.log(product)}
          <h1>Product Details</h1>
        </>
      )}
    </>
  );
};

export default ProductDetails;
