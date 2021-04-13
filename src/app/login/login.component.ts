import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';

import { UserService } from '../users.service';
import { User } from '../user';
import { Users } from '../users';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: any;
  selectedUser: User= {id:'', user:{ID:'', admin: true, email: '', name: '', password: ''}};
  
  found = false;
  submitted = false;
  returnUrl: string = "";
  loggingForm: any;
  message: String = "";

  hide=false;

  usersBulk: Users[] = [];
  users: User[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public global: AppComponent,
    private router: Router,
  ) { 
    this.loggingForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    this.checkLogin();
    this.getUsersBulk();
  }

  checkLogin(){
    if (this.global.login == true){
      if (this.global.logUser.user.admin){
        this.router.navigate(['/entries']);
      }else{
        this.router.navigate(['/user', this.global.loginID]);
      }
    }
  }

  getUsers(){
    for (let item of this.usersBulk){
      for (let occ of item.users){
        //Important 'iter' here -> Async will rewrite last occurrence x.length times  
        let iter: User= {id:'', user:{ID:'', admin: true, email: '', name: '', password: ''}};
        //Append every Entry to this.entries array
        iter.id=item.id;
        iter.user.ID=occ.user.ID;
        iter.user.admin=occ.user.admin;
        iter.user.email=occ.user.email;
        iter.user.name=occ.user.name;
        iter.user.password=occ.user.password;
        this.users.push(iter);
      }
    }
  }
  getUsersBulk(): void {
    this.userService.getUsers().subscribe(data => {
      this.usersBulk = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Users;
      })
      //Code for ASYNC iteration
      
      this.getUsers();
     // this.getUserLogs();
      
    }) 
  }

  onSubmit() {
    this.message='';

    this.submitted = true;
    let subEM = this.loggingForm.value.email;
    let subPW = this.loggingForm.value.password;

    for (let item of this.users){
      if ((item.user.email == subEM ) && (item.user.password == subPW)){
        this.found = true;
        this.selectedUser = item;
        
        this.global.login = true;
        this.global.loginID = this.selectedUser.user.ID;
        this.global.logUser = item;

        if (this.global.logUser.user.admin){
          this.router.navigate(['/entries']);
        }else{
          this.router.navigate(['/user', this.global.loginID]);
        }
        
      }
    }
    if (this.found != true){
      this.message = "Email or Password is wrong. Please try again";
      this.global.loginID  = '0000';
      this.global.login = false;
      this.openSnackBar();
    }

    this.found = false;
    console.log("EM: " + subEM + " PW: " + subPW);
    
  }

  openSnackBar(){
   this.snackbar.open('Email or Password is wrong. Please try again', 'CLOSE', {
       duration: 5000,
    });
  }

}
