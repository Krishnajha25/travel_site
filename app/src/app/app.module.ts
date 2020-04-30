import { BrowserModule } from '@angular/platform-browser';
//import { JwtModule } from '@auth0/angular-jwt'
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';


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

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticateGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'places', component: PlaceLandingComponent }
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

  ],
  imports: [
    AdminModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  ],
  providers: [PlacesService ,ValidateService, AuthService, AuthenticateGuard, 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
