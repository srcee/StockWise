import React from 'react';
import { CircularProgress } from '@mui/material';

export interface LoaderProps {
  dataTestId?: string;
}

export const Loader: React.FC<LoaderProps> = ({ dataTestId }) => (
  // can not add translations to aria-labels, because they are not loaded yet in some cases (login), results in an error
  <div data-testid={dataTestId} className="loader-centred" role="progressbar" aria-label="loading">
    <CircularProgress aria-label="loading" />
  </div>
);