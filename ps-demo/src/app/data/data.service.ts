import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from './user-settings';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  postUserSettingsForm(userSettings: UserSettings): Observable<any> {
    return this.httpClient.post('https://putsreq.com/lc13t06PYQBY4oZPXcrs', userSettings);
  }

  getSubscriptionTypes(): Observable<string[]> {
    return of(["Monthly", "Yearly", "Quaterly"])
  }
}
