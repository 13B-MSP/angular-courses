import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

enum ToggleOnOff {
  ON = 'On',
  OFF = 'Off'
}

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: 'Milton',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 1,
    notes: 'notes...'
  }
  singleModel: ToggleOnOff = ToggleOnOff.ON;
  postError: boolean = false;
  postErrorMessage: string = '';
  subscriptionTypes$: Observable<string[]> = this.dataService.getSubscriptionTypes();
  startDate!: Date;
  startTime!: Date;
  userRating: number = 0;
  maxRating: number = 10.0;
  isReadonly: boolean = false;

  userSettings: UserSettings = { ...this.originalUserSettings };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes$ = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
    this.startTime = new Date();
  }


  onSubmit(form: NgForm) {
    console.log("in on submi: ", form.value);
    // if (form.valid) {
    //   this.dataService.postUserSettingsForm(this.userSettings).subscribe({
    //     next: result => console.log('success: ', result),
    //     error: error => this.onHttpError(error)
    //   });
    // } else {
    //   this.postError = true;
    //   this.postErrorMessage = "invalid form entry";
    // }
  }

  onBlur(field: NgModel) {
    console.log("in on blur: " + field.valid);
  }

  onHttpError(errorResponse: any) {
    console.log("on error: " + JSON.stringify(errorResponse));
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
}
