import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './components/budget/budget.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { RegisterGuard } from './guards/register/register.guard';


const routes: Routes = [
  {path: 'budget', component: BudgetComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupPageComponent, canActivate: [RegisterGuard]},
  {path: '', component: LoginPageComponent},
  {path: '**', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
