import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { DndModule } from 'ng2-dnd';
import { MaterialModule } from './material.module';
import { NavComponent } from './nav/nav.component';
import { SignupComponent } from './signup/signup.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TagInputModule } from 'ngx-chips';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'playGame',
    canActivate: [AuthGuardService],
    component: PlayGameComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignupComponent,
    PlayGameComponent
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot(),
    TagInputModule,
    RouterModule.forRoot(appRoutes),
    LoginModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
