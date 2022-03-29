import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

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
  postError: boolean = false;
  postErrorMessage: string = '';
  subscriptionTypes$: Observable<string[]> = this.dataService.getSubscriptionTypes();

  userSettings: UserSettings = { ...this.originalUserSettings };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes$ = this.dataService.getSubscriptionTypes();
  }


  onSubmit(form: NgForm) {
    console.log("in on submi: ", form.valid);
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe({
        next: result => console.log('success: ', result),
        error: error => this.onHttpError(error)
      });
    } else {
      this.postError = true;
      this.postErrorMessage = "invalid form entry";
    }
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
