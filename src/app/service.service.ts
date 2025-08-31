import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usermodel } from './model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  private readonly basepath ='http://localhost:4000/';


  // user Module api's
  private readonly  getalluserdetails ='userModule/getall';

  viewallUserDetails(model:usermodel):Observable<any>{
    return this.http.post(`${this.basepath}${this.getalluserdetails}`,model);
  }
}
