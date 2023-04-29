import React from 'react';
import { ErrorNotFound } from '../../components/Shared';
import MetaData from '../../utils/MetaData';

const NotFoundPage = () => {
  return (
    <>
      <MetaData title="404 | Page is not found" />
      <ErrorNotFound />
    </>
  );
};

export default NotFoundPage;
