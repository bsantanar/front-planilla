import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  private reserveUrl = environment.apiUrl + 'reservation';

  constructor(private http: HttpClient) { }

  public updateReserveTariff(reserve: any){
    return this.http.put(this.reserveUrl + '/rate', reserve);
  }
}
