export interface Data {
  date: Date;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  marketcap: string;
  epoch?: number;
}

export interface DataVM {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  marketcap: number;
  epoch?: number;
}
