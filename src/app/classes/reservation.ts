import { Alert } from './alert';

export interface Reservation {
    store: string;
    officeStore: string;
    locationOrigin: string;
    locationDestination: string;
    roadNumber: number;
    guideNumber: string;
    reservationNumber: string;
    sector: string;
    weight: number;
    distance: any;
    modality: string;
    tariff: number;
}