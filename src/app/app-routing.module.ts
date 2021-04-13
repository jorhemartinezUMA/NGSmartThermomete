import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesComponent } from './entries/entries.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PersonalEntryComponent } from './personal-entry/personal-entry.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'entries', component: EntriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/:id', component: PersonalEntryComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  
})
export class AppRoutingModule { }
