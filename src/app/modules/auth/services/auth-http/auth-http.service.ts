import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../models/auth.model';

const API_USERS_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${API_USERS_URL}/me`, {
      headers: httpHeaders,
    });
  }

  //service login
  login(data, requestOptions) {
    return this.http.post(`${environment.apiUrl}/auth/login`, data, requestOptions);
  }

  // service send email/phone number to verify account
  verifyUser(emailPhone = '', domain = '') {
    return this.http.get(`${environment.apiUrl}/forgot-password/confirm-user?EmailPhone=${emailPhone}&Domain=${domain}`);
  }

  // service send account to verify code
  sendVerifyCode(data = {}) {
    return this.http.post(`${environment.apiUrl}/forgot-password/send-verification-code`, data);
  }

  // service to check valid time code
  checkValidTimeCode(userId = {}) {
    return this.http.get(`${environment.apiUrl}/forgot-password/check-resend-code?UserId=${userId}`);
  }

  // service send code
  sendCode(code: string) {
    return this.http.post(`${environment.apiUrl}/forgot-password/verify-code`, { code });
  }

  // service change password
  changePassword(data = {}) {
    return this.http.patch(`${environment.apiUrl}/forgot-password/change-password`, data);
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/authentication/logout`, {});
  }

  getMyInformation(token){
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${environment.apiUrl}/common/my-information`, { headers: httpHeaders });
  }
}
