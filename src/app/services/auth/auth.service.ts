import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorHandler} from "../../shared/error-handler";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {Profile} from "../../models/profile";
import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";
import {UserData} from "../../models/user-data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  _registerUrl = `http://localhost:3000/auth/register`;
  _loginUrl = `http://localhost:3000/auth/login`;
  _userUrl = `http://localhost:3000/auth/current-user`;
  _profileUrl = `http://localhost:3000/profile`;
  private _usersURL = `http://localhost:3000/auth/system-users`;
  private _userDataURL = `http://localhost:3000/auth/user-main-data`;
  private imageChangeUrl = `http://localhost:3000/profile/userprofile/changeprofileimage`;
  private newImageUrl = `http://localhost:3000/profile/userprofile/setprofileimage`;
  private contactUrl = `http://localhost:3000/contacts/new-mail`;
  private errorHandler: ErrorHandler = new ErrorHandler();

  public currentUser: User;
  public profile: Profile;
  public cart: Cart;
  public cartItem: CartItem;
  public username: string;


  register(data: any): Observable<any> {
    try {
      return this.http.post<any>(this._registerUrl, data);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  pUserData() {
    if (this.isLoggedIn()) {
      this.prepareUserData().subscribe((uData: UserData) => {
        this.profile = uData.profile;
        this.username = `${uData.profile.firstname} ${uData.profile.lastname}`;
        this.cart = uData.cart;
        this.cartItem = uData.cartItem;
      });
      this.getCurrentUser().subscribe(resUser => {
        this.currentUser = resUser;
      });
    }
  }

  login(data: any): Observable<any> {
    try {
      return this.http.post<any>(this._loginUrl, data);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  userLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  prepareUserData(): Observable<UserData> {
    try {
      return this.http.get<any>(this._userDataURL);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  messageContact(messageForm: any): Observable<void> {
    try {
      return this.http.post<any>(this.contactUrl, messageForm);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getCurrentUser() {
    try {
      return this.http.get<any>(this._userUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getSystemUsers(): Observable<User[]> {
    try {
      return this.http.get<User[]>(this._usersURL);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserProfile(): Observable<Profile> {
    try {
      return this.http.get<any>(this._profileUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
