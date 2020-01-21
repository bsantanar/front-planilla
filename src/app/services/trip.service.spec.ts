import { TestBed, getTestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Trip } from '../classes/trip';
import { of } from 'rxjs';

const expectedResponse: Trip[] = [{
    patent: 'ASQW12',
    carrier: 'TEST',
    date: new Date(2019, 11, 1),
    reservationDetail: null,
    reservationDetailError: null,
    locationAproach: null,
    locationApproachError: null,
    totalTariff: 10000,
    percentage: 80
}]

fdescribe('TripService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let service: TripService;
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new TripService(<any> httpClientSpy);
    });

    it('should return expected response', () => {
        let startDate = "2019-01-01";
        let endDate = "2019-01-01";
        httpClientSpy.get.and.returnValue(of(expectedResponse));
        
        service.getTripsByDate(startDate, endDate).subscribe(
            res => expect(res).toEqual(expectedResponse),
            error => fail('not expected trips')
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
});