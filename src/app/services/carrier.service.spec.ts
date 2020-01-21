import { TestBed, getTestBed } from '@angular/core/testing';

import { CarrierService } from './carrier.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Carrier } from '../classes/carrier';

const expectedResponse: Carrier = {
    carriePK: 1,
    carrieName: 'TestCarrier',
    carrieValRut: '12312322',
    carrieFlgActive: '1',
}

fdescribe('CarrierService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let service: CarrierService;
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new CarrierService(<any> httpClientSpy);
    });
    it('should return one carrier', () => {
        let id = 12123123;
        httpClientSpy.get.and.returnValue(of(expectedResponse));

        service.getCarrierById(id).subscribe(
            res => expect(res).toEqual(expectedResponse),
            err => fail('not expected response')
        );

        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
});