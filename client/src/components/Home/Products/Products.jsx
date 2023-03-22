import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../../actions/productAction';
import { Loader } from '../../Shared';

const Products = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div id="products">
          {console.log(products)}
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            libero exercitationem sunt laudantium facere numquam rerum pariatur,
            molestiae similique dolorum eos praesentium provident neque quos?
            Harum deserunt sequi accusantium delectus!
          </h1>{' '}
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            libero exercitationem sunt laudantium facere numquam rerum pariatur,
            molestiae similique dolorum eos praesentium provident neque quos?
            Harum deserunt sequi accusantium delectus!
          </h1>{' '}
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            libero exercitationem sunt laudantium facere numquam rerum pariatur,
            molestiae similique dolorum eos praesentium provident neque quos?
            Harum deserunt sequi accusantium delectus!
          </h1>{' '}
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            libero exercitationem sunt laudantium facere numquam rerum pariatur,
            molestiae similique dolorum eos praesentium provident neque quos?
            Harum deserunt sequi accusantium delectus!
          </h1>{' '}
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            libero exercitationem sunt laudantium facere numquam rerum pariatur,
            molestiae similique dolorum eos praesentium provident neque quos?
            Harum deserunt sequi accusantium delectus!
          </h1>{' '}
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            libero exercitationem sunt laudantium facere numquam rerum pariatur,
            molestiae similique dolorum eos praesentium provident neque quos?
            Harum deserunt sequi accusantium delectus!
          </h1>{' '}
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            libero exercitationem sunt laudantium facere numquam rerum pariatur,
            molestiae similique dolorum eos praesentium provident neque quos?
            Harum deserunt sequi accusantium delectus!
          </h1>{' '}
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            libero exercitationem sunt laudantium facere numquam rerum pariatur,
            molestiae similique dolorum eos praesentium provident neque quos?
            Harum deserunt sequi accusantium delectus!
          </h1>{' '}
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            libero exercitationem sunt laudantium facere numquam rerum pariatur,
            molestiae similique dolorum eos praesentium provident neque quos?
            Harum deserunt sequi accusantium delectus!
          </h1>
        </div>
      )}
    </>
  );
};

export default Products;
