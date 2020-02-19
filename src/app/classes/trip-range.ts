import { Trip } from './trip';

export interface TripRange {
    trips: Trip[];
    patent: string;
    totalTariff: number;
    carrier: string;
    percentage: number;
}