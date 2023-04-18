import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginCrudComponent } from './login-crud/login-crud.component';
import { AuthGuard } from './guards/auth.guards';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
//all components routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login-crud', component: LoginCrudComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
//function is use to get jwt token from local storage
export function tokenGetter() {
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginCrudComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7299"],
        disallowedRoutes: []
      }
  }),
    //AppRoutingModule
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
