import { Reservation } from './reservation';
import { Alert } from './alert';
import { Approach } from './approach';

export interface Trip {
    patent: string;
    carrier: any;
    date: Date;
    reservationDetail: Reservation[];
    reservationDetailError: Alert[];
    locationApproach: Approach[];
    locationApproachError: Approach[];
    totalVal: number;
    percentage: number;
  }