import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ChatComponent } from './components/chat/chat.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SurveyComponent } from './components/survey/survey/survey.component';
import { SurveyListComponent } from './components/surveyList/survey-list/survey-list.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'survey', component: SurveyComponent, canActivate: [AuthGuard] },
  {
    path: 'surveyList',
    component: SurveyListComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./modules/games/games.module').then((m) => m.GamesModule),
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
