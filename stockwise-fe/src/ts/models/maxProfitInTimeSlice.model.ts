export interface MaxProfitInTimeSlice {
  buyTime: Date;
  sellTime: Date;
  profit: number;
}

export interface MaxProfitInTimeSlicePayload {
  start: string;
  end: string;
  sum: number;
}
