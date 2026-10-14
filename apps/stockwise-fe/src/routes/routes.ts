import MaxProfitInTimeSlice from '../features/MaxProfitInTimeSlice/MaxProfitInTimeSlice';
import { ApplicationRoute, RouteName, RoutePrefix } from './routes.interface';

const ROUTES: Record<RouteName, ApplicationRoute> = {
  [RouteName.MaxProfitInTimeSlice]: {
    path: RoutePrefix.Home,
    component: MaxProfitInTimeSlice,
    exact: true,
  },
};

export default ROUTES;
