/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';
import { map } from 'rxjs/operators';


import * as countriesLib from 'i18n-iso-countries';


declare const require: (arg0: string) => countriesLib.LocaleData;

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = environment.apiURL + 'users';
    constructor(private http: HttpClient) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        countriesLib.registerLocale(require('i18n-iso-countries/langs/es.json'));
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers);
    }

    getUser(UserId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${UserId}`);
    }

    createUser(User: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, User);
    }

    updateUser(User: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${User.id}`, User);
    }

    deleteUser(UserId: string): Observable<any> {
        return this.http.delete<Object>(`${this.apiURLUsers}/${UserId}`);
    }

    getCountries(): { id: string; name: string }[] {
        return Object.entries(countriesLib.getNames('es', { select: 'official' })).map((entry) => {
            return {
                id: entry[0],
                name: entry[1]
            };
        });
    }

    getCountry(countryKey: string): string {
        return countriesLib.getName(countryKey, 'es');
    }

    getUsersCount(): Observable<any> {
      return this.http
      .get<number>(`${this.apiURLUsers}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
}
