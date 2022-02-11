import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {SignInComponent} from './components/sign-in/sign-in.component';

import {AuthInterceptor} from './services/authconfig.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {AddDeeplinkComponent} from './components/add-deeplink/add-deeplink.component';
import {ShowDeeplinkComponent} from './components/show-deeplink/show-deeplink.component';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from './material/material.module';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {MatCardModule} from "@angular/material/card";

import {DialoglinkComponent} from './components/dialoglink/dialoglink.component';
import {SpinnerOverlayComponent} from './components/spinner-overlay/spinner-overlay.component';
import {SpinnerInterceptor} from "./services/spinner.interceptor";
import { AddVariablesComponent } from './components/add-variables/add-variables.component';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    SignInComponent,
    SignUpComponent,
    AddDeeplinkComponent,
    ShowDeeplinkComponent,
    DashboardComponent,
    ConfirmationDialogComponent,
    NotfoundComponent,
    DialoglinkComponent,
    SpinnerOverlayComponent,
    AddVariablesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    MatCardModule
  ],
  providers: [

    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
