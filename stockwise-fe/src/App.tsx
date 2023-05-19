import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import ROUTES from './routes/routes';
import { RouteName, RoutePrefix } from './routes/routes.interface';

const App: React.FC = () => {
  const getAppRoutes = (): JSX.Element[] => {
    const paths: JSX.Element[] = [];
    for (const route in ROUTES) {
      if (route in ROUTES) {
        const { path, component } = ROUTES[route as RouteName];

        paths.push(<Route key={path} path={path} element={React.createElement(component)} />);
      }
    }
    return paths;
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <Router>
        <Routes>
          {getAppRoutes()}
          <Route path="*" element={<Navigate to={RoutePrefix.Home} replace />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
