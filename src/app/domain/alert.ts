import { Deal } from './deal';

export interface Alert {
    dataOrigin: string;
    guideNumber: string;
    modality: string;
    obs: string;
    error: Deal[];
    officeStore: number;
    office: number;
    patent: string;
    reservationNumber: number;
    roadNumber: number;
}