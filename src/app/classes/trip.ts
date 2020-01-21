import { Reservation } from './reservation';
import { Alert } from './alert';

export interface Trip {
    patent: string;
    carrier: any;
    date: Date;
    reservationDetail: Reservation[];
    reservationDetailError: Alert[];
    locationAproach: any[];
    locationApproachError: any[];
    totalTariff: number;
    percentage: number;
  }