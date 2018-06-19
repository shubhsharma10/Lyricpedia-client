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
import { ResultComponent } from './result/result.component';
import {DataService} from './services/data.sevice';
import {MusixMatchAPIServiceClient} from './services/musixmatch.service.client';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { ArtistPageComponent } from './artist-page/artist-page.component';
import { AlbumPageComponent } from './album-page/album-page.component';
import { TrackPageComponent } from './track-page/track-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TopNavbarComponent,
    BottomNavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminPageComponent,
    ResultComponent,
    ArtistPageComponent,
    AlbumPageComponent,
    TrackPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxDatatableModule
  ],
  providers: [
    UserServiceClient,
    DataService,
    MusixMatchAPIServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
