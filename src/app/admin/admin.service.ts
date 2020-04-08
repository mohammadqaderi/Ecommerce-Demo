import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../shared/error-handler";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _usersUrl = 'http://localhost:3000/auth/system-users';
  private _existDataUrl = 'http://localhost:3000/auth/exist-data';
  errorsHandler = new ErrorHandler();

  constructor(private http: HttpClient) {
  }

  getSystemUsers(): Observable<User[]> {
    try {
      return this.http.get<User[]>(this._usersUrl);
    } catch (error) {
      this.errorsHandler.handleError(error);
    }
  }

  getExistData(): Observable<any> {
    try {
      return this.http.get<any>(this._existDataUrl);
    } catch (error) {
      this.errorsHandler.handleError(error);
    }
  }
}
