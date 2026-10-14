export enum RouteName {
  MaxProfitInTimeSlice = 'maxProfitInTimeSlice',
}

export enum RoutePrefix {
  Home = '/',
}

export interface ApplicationRoute {
  path: string;
  component: React.FC;
  exact: boolean;
}
