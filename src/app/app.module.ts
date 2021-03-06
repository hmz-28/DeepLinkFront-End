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
import { NotfoundComponent } from './components/notfound/notfound.component';
import { APP_BASE_HREF, Location } from '@angular/common';

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
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule
  ],
  providers: [

    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: APP_BASE_HREF, useValue: window['base-href'] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
