import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripUrl = environment.apiUrl + 'reservation/bydate';

  constructor(private http: HttpClient) { }

  public getTripsByDate(date:string){
    let params = new HttpParams().set("reservationDate", date);
    return this.http.get(this.tripUrl, {params});
  }
}
