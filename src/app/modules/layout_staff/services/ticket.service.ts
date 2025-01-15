import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient
  ) { }

  getListTicket(data: any){
    return this.http.get(`${environment.apiUrl}/manager/leaverequest`, {params: {...data}})
  }

  getListTicketParent(){
    return this.http.get(`${environment.apiUrl}/guardian/leaverequest`)
  }

  addNewTicket(data: any){
    return this.http.post(`${environment.apiUrl}/guardian/leaverequest/storeleave/${data.studentId}`, data)
  }

  removeTicket(data: any){
    return this.http.post(`${environment.apiUrl}/guardian/leaverequest/cancel/${data.leave_request_id}`, data)
  }

  confirmTicket(data: any){
    return this.http.put(`${environment.apiUrl}/manager/leaverequest/accept/${data.id}`, data)
  }

  denyTicket(data: any){
    return this.http.put(`${environment.apiUrl}/manager/leaverequest/reject/${data.id}`, data)
  }
}
