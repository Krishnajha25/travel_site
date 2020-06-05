import { BrowserModule } from '@angular/platform-browser';

//import { JwtModule } from '@auth0/angular-jwt'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image'
import { NgxSpinnerModule } from 'ngx-spinner'
import { NgxPaginationModule } from "ngx-pagination";

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { ValidateService } from './services/validate.service';

import { PlacesGridComponent } from './components/places-grid/places-grid.component';
import { PlaceLandingComponent } from './components/place-landing/place-landing.component';
import { AuthService } from './services/auth.service';
import { AuthenticateGuard } from './guards/authenticate.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PlacesService } from './services/places.service';
import { ShowMorePipe } from './pipes/show-more.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { PlacesComponent } from './components/places/places.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import{ MatFormFieldModule } from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';


import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { CommentComponent } from './components/comment/comment.component';
import { ChartsModule } from 'ng2-charts';
import { SearchPipe } from './pipes/search.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetLinkExpireComponent } from './components/reset-link-expire/reset-link-expire.component';
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';
import { NavigationComponent } from './components/navigation/navigation.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticateGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'places', component: PlaceLandingComponent },
  { path: 'places/:name', component: PlacesComponent},
  { path: 'forget-password', component: NewPasswordComponent},
  { path: 'reset/:email/:token', component: ResetPasswordComponent},
  { path: 'link-expired', component: ResetLinkExpireComponent},
  { path: 'password-changed-success', component: PasswordChangedComponent},
  { path: 'navigation', component: NavigationComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ContactComponent,
    PlacesGridComponent,
    PlaceLandingComponent,
    ShowMorePipe,
    DefaultImagePipe,
    PlacesComponent,
    CommentComponent,
    SearchPipe,
    SearchFilterPipe,
    NewPasswordComponent,
    ResetPasswordComponent,
    ResetLinkExpireComponent,
    PasswordChangedComponent,
    NavigationComponent,
  ],
  imports: [
    AdminModule,
    BrowserModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    MatDialogModule,
    ChartsModule,
    LazyLoadImageModule.forRoot({
      preset: scrollPreset // <-- tell LazyLoadImage that you want to use scrollPreset
    })
  ],
  providers: [PlacesService ,ValidateService, AuthService, AuthenticateGuard, 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
