import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripUrl = environment.apiUrl + 'trip';

  constructor(private http: HttpClient) { }

  public getTripsByDate(startDate:string, endDate: string){
    let params = new HttpParams().set("startDate", startDate).set("endDate", endDate);
    return this.http.get(this.tripUrl + '/bydate', {params});
  }
}
