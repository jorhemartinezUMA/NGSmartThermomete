import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { EntriesComponent } from './entries/entries.component';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { PersonalEntryComponent } from './personal-entry/personal-entry.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion'
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    PersonalEntryComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule,
    // MatMenuModule,
    MatButtonModule,
    MatTableModule,
    // MatDividerModule,
    // MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatExpansionModule,
    // MatSlideToggleModule,
    // MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
