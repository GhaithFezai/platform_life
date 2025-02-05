import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { autorisationGuard } from './autorisation.guard';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { TaskeComponent } from './taske/taske.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { NoteComponent } from './note/note.component';


const routes: Routes = [
  { path: '', redirectTo : '/login', pathMatch: 'full' }, 
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tableau', component: CalendrierComponent },
      { path: 'taske', component: TaskeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'note/:id', component: NoteComponent },
    ],
    canActivate: [autorisationGuard]
  },


  { path: '**', redirectTo: '/login' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
