import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { ErrorNotFound } from '../../components/Shared';

const NotFoundPage = () => {
  return (
    <>
      <MetaData title="404 | Page is not found" />
      <ErrorNotFound />
    </>
  );
};

export default NotFoundPage;
