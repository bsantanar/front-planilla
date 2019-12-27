import { Reservation } from './reservation';

export interface Trip {
    patent: string;
    carrier: any;
    date: Date;
    detail: Reservation[];
    totalTariff: number;
    percentage: number;
  }