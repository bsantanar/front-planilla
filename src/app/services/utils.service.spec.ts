import { TestBed, getTestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

fdescribe('UtilsService', () => {
    let injector: TestBed;
    let service: UtilsService;
    beforeEach(() => { 
        TestBed.configureTestingModule({
            providers: [UtilsService]
        });
        injector = getTestBed();
        service = injector.get(UtilsService);
     });

    it('should return parsed tarif to string', () => {
        const numberTarif = 12123;
        expect(service.formatNumber(numberTarif)).toBe("12.123");
    });
    it('should return parsed date', () => {
        const date = new Date(2010, 0, 15);
        expect(service.parseDate(date)).toBe("2010-01-15");
    });
});