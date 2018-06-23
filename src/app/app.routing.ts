import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';
import {ResultComponent} from './result/result.component';
import {ArtistPageComponent} from './artist-page/artist-page.component';
import {AlbumPageComponent} from './album-page/album-page.component';
import {TrackPageComponent} from './track-page/track-page.component';
import {RatedSongsComponent} from './rated-songs/rated-songs.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {PlaylistsPageComponent} from './playlists-page/playlists-page.component';
import {PlaylistPageComponent} from './playlist-page/playlist-page.component';
import {PublicProfileComponent} from './public-profile/public-profile.component';
import {UserSearchpageComponent} from './user-searchpage/user-searchpage.component';
import {AdminConsolePageComponent} from './admin-console-page/admin-console-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'result', component: ResultComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminPageComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'artist/:artistId', component: ArtistPageComponent},
  { path: 'album/:albumId', component: AlbumPageComponent},
  { path: 'track/:trackId', component: TrackPageComponent},
  { path: 'playlist/:playlistId', component: PlaylistPageComponent},
  { path: 'user/search', component: UserSearchpageComponent},
  { path: 'user/:userId', component: PublicProfileComponent},
  { path: '**', component: HomePageComponent} // last
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
