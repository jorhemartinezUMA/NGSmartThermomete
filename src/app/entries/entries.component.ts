import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';
import { States } from '../states';
import { Users } from '../users';
import { User } from '../user';
import { ShowEntry } from '../showEntry';
import { UserService } from '../users.service';
import { Alert } from '../alert';

import { Router } from '@angular/router';

import { AppComponent } from '../app.component';


import {AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  
  entries: Entry[] = [];
  states: States[] = [];
  showEntries: ShowEntry[] = [];

  usersBulk: Users[] = [];
  users: User[] = [];

  dataSource: any;
  displayedColumns : string [] = ['name', 'temperature', 'timestamp', 'active'];

  selectedEntry: Entry = {id:'', state:{ID:'', seconds: 0, temperature:0, timestamp: ''}};;
  constructor(
    private entryService: EntryService, 
    private userService: UserService,
    public global: AppComponent,
    private router: Router,
    ) { }


  ngOnInit(): void {
    this.checkLogin();
    this.getUsersBulk();
    this.getEntries();
   }

  onSelect(entry: Entry): void {
    this.selectedEntry = entry;
  }

  checkLogin(): void {
    if (this.global.login == false){
      this.router.navigate(['']);
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
      //this.getLogs();
      this.getShowEntries();
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

    let found = false;
    for (let item of this.entries){
      let al: Alert = {active: false, seconds: 0, temperature: 0, timestamp: ''}; 
      let iter: ShowEntry= {id:'', state:{ID:'', name: '', seconds: 0, temperature:0, timestamp: ''}, alert: al};
      for (let sItem of this.showEntries){
          if (item.state.ID == sItem.state.ID){
            found = true;
            if (item.state.seconds > sItem.state.seconds){
              let tNM: String = '';
              for (let us of this.users){
                if (us.user.ID == item.state.ID){
                  tNM = us.user.name;
                }
              }
              
              iter.id = item.id;
              iter.state.ID = item.state.ID;
              iter.state.name = tNM;
              iter.state.seconds = item.state.seconds;
              iter.state.temperature = item.state.temperature;
              iter.state.timestamp = item.state.timestamp;

              let foundIndex = this.showEntries.findIndex(x => x.state.ID == sItem.state.ID);
              this.showEntries[foundIndex] = iter;
            }
          }
        
      }
      if (found == false){
        let tNM: String = '';
        for (let us of this.users){
          if (us.user.ID == item.state.ID){
            tNM = us.user.name;
          }
          
        }
        iter.id = item.id;
          iter.state.ID = item.state.ID;
          iter.state.name = tNM;
          iter.state.seconds = item.state.seconds;
          iter.state.temperature = item.state.temperature;
          iter.state.timestamp = item.state.timestamp;
          this.showEntries.push(iter);
      }
      found = false;
      iter= {id:'', state:{ID:'', name: '', seconds: 0, temperature:0, timestamp: ''}, alert: al};
    }

    this.getAlerts();
    this.dataSource = new MatTableDataSource<ShowEntry>(this.showEntries);
  }

  getAlerts(): void {
    for (let sItem of this.showEntries){
      let al: Alert;
      let lastIndex = -1;
      let sIndex = this.showEntries.findIndex(x => x.state.ID == sItem.state.ID);;
      for (let item of this.entries){
        if (sItem.state.ID == item.state.ID){
          if (item.state.temperature >= this.global.threshold){
            if (lastIndex >= 0){
              if (item.state.seconds > this.entries[lastIndex].state.seconds){
                lastIndex = this.entries.findIndex(x => (x.state.ID == item.state.ID)&&(x.state.seconds == item.state.seconds));
                al = {active: true, seconds: item.state.seconds, temperature: item.state.temperature, timestamp: item.state.timestamp};
              this.showEntries[sIndex].alert = al;
              }

            }else{
              lastIndex = this.entries.findIndex(x => (x.state.ID == item.state.ID)&&(x.state.seconds == item.state.seconds));
              al = {active: true, seconds: item.state.seconds, temperature: item.state.temperature, timestamp: item.state.timestamp};
              this.showEntries[sIndex].alert = al;
            }
            
          }

        }

      }
    }
  }
  //getAlerts()

}

