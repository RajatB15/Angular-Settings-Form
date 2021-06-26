import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { UserSettings } from '../data/user-settings';
import { DataService } from '../data/data.service';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  postError= false;
  postErrorMessage = null;
  subscriptionTypes:Observable<string[]>;
  startDate: Date;

  originalUserSettings: UserSettings = {
    Name: null,
    EmailPromotion: null,
    InterfaceMode: null,
    SubscriptionType: null,
    Notes: null,
  };

  userSettings: UserSettings = { ...this.originalUserSettings };
  constructor(private dataService: DataService) {
    this.subscriptionTypes= dataService.getSubscriptionType();
    this.startDate=new Date();
  }

  ngOnInit() {}

  onError(errorResponse: any){
    console.error("Error", errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log("form submitted", form.submitted);

    if(form.valid){
      this.postError=false;
      this.postErrorMessage=null;
      this.dataService.postUserSettingsData(this.userSettings).subscribe(
        (result) => console.log("Success", result),
        (error) => this.onError(error)
      );
    }
    else{
      this.postError=true;
      this.postErrorMessage="Please submit valid input";
    }
  }
}
