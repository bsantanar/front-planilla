import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Approach } from '../domain/approach';

@Injectable({
  providedIn: 'root'
})
export class ApproachService {

  private approachUrl = environment.apiUrl + 'approach';

  constructor(private http: HttpClient) { }

  public updateApproachTariff(approach: any){
    return this.http.put(this.approachUrl + "/update", approach);
  }
}
