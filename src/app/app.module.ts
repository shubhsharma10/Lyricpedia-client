import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app.routing';
import {FormsModule} from '@angular/forms';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {UserServiceClient} from './services/user.service.client';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TopNavbarComponent,
    BottomNavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    UserServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
