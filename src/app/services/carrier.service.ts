import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  carrierUrl = environment.apiUrl + 'carrier/';

  constructor(private http: HttpClient) { }

  getCarrierById(id: number){
    return this.http.get(this.carrierUrl + id);
  }

}
