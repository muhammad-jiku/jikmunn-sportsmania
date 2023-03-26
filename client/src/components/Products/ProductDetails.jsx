import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors } from '../../actions/productAction';
import { Loader } from '../Shared';

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error]);

  return (
    <>
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
