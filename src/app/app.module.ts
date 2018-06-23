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
import {TrackServiceClient} from './services/track.service.client';
import { RatedSongsComponent } from './rated-songs/rated-songs.component';
import {PlaylistServiceClient} from './services/playlist.service.client';
import { PlaylistsPageComponent } from './playlists-page/playlists-page.component';
import { AllSongsComponent } from './all-songs/all-songs.component';
import { AllPlaylistsComponent } from './all-playlists/all-playlists.component';
import { PlaylistPageComponent } from './playlist-page/playlist-page.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserPlaylistsComponent } from './user-playlists/user-playlists.component';
import { UserTranslatedSongsComponent } from './user-translated-songs/user-translated-songs.component';
import { AllTranslatedSongsComponent } from './all-translated-songs/all-translated-songs.component';
import { UserSearchpageComponent } from './user-searchpage/user-searchpage.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
    TrackPageComponent,
    RatedSongsComponent,
    PlaylistsPageComponent,
    AllSongsComponent,
    AllPlaylistsComponent,
    PlaylistPageComponent,
    PublicProfileComponent,
    FollowersComponent,
    FollowingComponent,
    UserListComponent,
    UserPlaylistsComponent,
    UserTranslatedSongsComponent,
    AllTranslatedSongsComponent,
    UserSearchpageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxDatatableModule,
    InfiniteScrollModule
  ],
  providers: [
    UserServiceClient,
    DataService,
    MusixMatchAPIServiceClient,
    TrackServiceClient,
    PlaylistServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
