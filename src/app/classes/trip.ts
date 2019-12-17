import { Reservation } from './reservation';

export interface Trip {
    patent: string;
    carrier: string;
    date: Date;
    detail: Reservation[];
    totalTariff: number;
  }