import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productAction';
import { Loader } from '../Shared';

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const categories = ['Cricket', 'Football'];

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('football');
  const [ratings, setRatings] = useState(0);

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

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {console.log(products, productsCount, resultPerPage)}
          <h1>Proudcts</h1>
        </>
      )}
    </>
  );
};

export default Products;
