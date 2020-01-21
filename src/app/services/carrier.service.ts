import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  private carrierUrl = environment.apiUrl + 'carrier/';

  constructor(private http: HttpClient) { }

  getCarrierById(id: number){
    return this.http.get(this.carrierUrl + id);
  }

}
