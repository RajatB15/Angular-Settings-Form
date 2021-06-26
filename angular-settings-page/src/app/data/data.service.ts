import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { UserSettings } from "./user-settings";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {}

  postUserSettingsData(userSettings: UserSettings): Observable<any> {
    return this.httpClient.post("https://putsreq.com/rzvnNZ3KPy1obaGZ04lI", userSettings);
    //return of(userSettings);
  }

  getSubscriptionType():Observable<any>{
    return of(["weekly","monthly","yearly"]);
  }
}
