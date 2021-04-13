import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Alert } from '../alert';

import { EntryService } from '../entry.service';
import { UserService } from '../users.service';
import { User } from '../user';
import { Users } from '../users';
import { Entry } from '../entry';
import { States } from '../states';

import { AppComponent } from '../app.component';
@Component({
  selector: 'app-personal-entry',
  templateUrl: './personal-entry.component.html',
  styleUrls: ['./personal-entry.component.css']
})
export class PersonalEntryComponent implements OnInit {
  id: any;

  entries: Entry[] = [];
  states: States[] = [];

  usersBulk: Users[] = [];
  users: User[] = [];

  selectedUser: User= {id:'', user:{ID:'', admin: true, email: '', name: '', password: ''}};
  lastEntry: Entry= {id:'', state:{ID:'', seconds:0, temperature:0, timestamp: ''}};
  maxEntry: Entry= {id:'', state:{ID:'', seconds:0, temperature:0, timestamp: ''}};

  alrt: Alert = {active: false, seconds: 0, temperature: 0, timestamp: ''};
  

  constructor(
    private route: ActivatedRoute,
    private entryService: EntryService,
    private userService: UserService,
    private location: Location,
    public global: AppComponent,
    private router: Router,

    ) { }

  ngOnInit(): void {
    this.checkLogin();
    this.getUsersBulk();
    this.getEntries();
    this.getID();
  }

  getID(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUserID();
  }
  
  goBack(): void {
    this.location.back();
  }

  checkLogin(): void {
    if (this.global.login == false){
      this.router.navigate(['']);
    }
  }

  getUserID(){
    //console.log("ID Selected: " + this.id);
    for (let item of this.users){
      console.log("iter ID: " + item.user.ID);
      if (item.user.ID == this.id){
        console.log("Selected User OK");
        this.selectedUser = item;
      }
    }
    //console.log("Name Selected: " + this.selectedUser.user.name);
    
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
  getEntries(): void {
    this.entryService.getEntries().subscribe(data => {
      this.entries = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Entry;
      })
      //Code for ASYNC iteration
    })
    this.entryService.getEntries().subscribe(data => {
      this.states = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as States;
      })
      //Code for ASYNC iteration
      this.getStates();
      this.getShowEntries();


      this.getID();
    }) 
  }
  getLogs(): void {
    for (let item of this.entries){
      console.log("id " + item.id + " ID "+ item.state.ID + " S: " + item.state.seconds + " T: " +item.state.temperature+ " D: " + item.state.timestamp);
      
      //console.log(item.id);
    }
    if(this.entries.length === 0){
      console.log("VOID");
    }
  }
  getStates(){
    for (let item of this.states){
      for (let occ of item.states){
        //Important 'iter' here -> Async will rewrite last occurrence x.length times  
        let iter: Entry= {id:'', state:{ID:'', seconds:0, temperature:0, timestamp: ''}};
        //Append every Entry to this.entries array
        iter.id=item.id;
        iter.state.ID=occ.state.ID;
        iter.state.seconds=occ.state.seconds;
        iter.state.temperature=occ.state.temperature;
        iter.state.timestamp=occ.state.timestamp;
        this.entries.push(iter);
        //this.getLogs();
      }
    }
  }

  getUserLogs() {
    for (let item of this.users){
      console.log("id " + item.id + " ID "+ item.user.ID + " S: " + item.user.name + " T: " +item.user.email+ " D: " + item.user.admin);
      
      //console.log(item.id);
    }
    if(this.entries.length === 0){
      console.log("VOID");
    }
  }
  getShowEntries(){
    console.log("Show entries");
    for (let item of this.entries) {
      if (this.id == item.state.ID){if (item.state.seconds > this.lastEntry.state.seconds){
          this.lastEntry = item;
        }
        if (item.state.temperature > this.maxEntry.state.temperature){
          this.maxEntry = item;
        }
      }
    }
    this.getAlerts();
  }

  getAlerts(){
    let al: Alert;
    let lastIndex = -1;

    for (let item of this.entries){
      if (this.id == item.state.ID){
          if (item.state.temperature >= this.global.threshold){
            if (lastIndex >= 0){
              if (item.state.seconds > this.entries[lastIndex].state.seconds){
                lastIndex = this.entries.findIndex(x => (x.state.ID == item.state.ID)&&(x.state.seconds == item.state.seconds));
                al = {active: true, seconds: item.state.seconds, temperature: item.state.temperature, timestamp: item.state.timestamp};
                this.alrt = al;
              }

            }else{
              lastIndex = this.entries.findIndex(x => (x.state.ID == item.state.ID)&&(x.state.seconds == item.state.seconds));
              al = {active: true, seconds: item.state.seconds, temperature: item.state.temperature, timestamp: item.state.timestamp};
              this.alrt = al;
            }
          }
      }
    }
  }

}
