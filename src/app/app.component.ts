import { Component, ViewChild } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';

import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Smart Thermometer UMA';
  
  login = false;
  loginID: String = '0000';
  logUser: User= {id:'', user:{ID:'', admin: false, email: '', name: '', password: ''}};

  threshold = 37;

  constructor(
    private router: Router
  ){}

  logout(): void{
    this.login = false;
    this.loginID = '0000';
    this.logUser = {id:'', user:{ID:'', admin: true, email: '', name: '', password: ''}};

    this.router.navigate(['/login']);
  }
}
