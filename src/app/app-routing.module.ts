import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddDeeplinkComponent } from './components/add-deeplink/add-deeplink.component';
import { ShowDeeplinkComponent } from './components/show-deeplink/show-deeplink.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthGuard } from "./shared/auth.guard";
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', redirectTo: 'dashboard/user-profile', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,
  children:[
    { path: 'add-deeplink', component: AddDeeplinkComponent},
    { path: 'user-profile', component: UserProfileComponent , canActivate: [AuthGuard]},
    { path: 'show-deeplink', component: ShowDeeplinkComponent, canActivate: [AuthGuard] }
  ]
  } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
