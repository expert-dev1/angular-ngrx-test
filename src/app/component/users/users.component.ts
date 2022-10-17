import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-new-user/add-new-user.component';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { User } from '../../model/user';
import Dexie, { Table } from 'dexie';
import { UsersState } from 'src/app/store/users.reducer';
import { Store, select } from '@ngrx/store';
import { selectAllUsers } from '../../store/users.selectors';
import { createUser, getAllUsers } from 'src/app/store/users.actions';


@Component({
  selector: 'app-user-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UserListComponent implements OnInit {
  list: any[] = [];
  isTab = false;
  searchUsers: any = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'profession'];
  
  users$: Observable<User[]>;
  db: any = new Dexie('userDB');
  item: any = {};
  userSearch = new Subject<string>();
  userSearchValue: string = "";
  constructor(public dialog: MatDialog,
    private store: Store<UsersState>,) {
    this.userSearch.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => {
      this.searchUser(value);
    });;
    this.db.version(1).stores({
      users: '++id, firstName, lastName, email, gender, phoneNumber'
    });
  }

  ngOnInit(): void {
    this.users$ = this.store.pipe(
      select(selectAllUsers)
    );
    this.users$.subscribe(resp => {
      console.log(resp)
      this.list = [...resp]
      this.searchUsers = [...resp]
    })
    this.setState();
  }

  async openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result != undefined && result.user) {
        this.db.users.add(result.user);
        let user:User = {
          firstName:result.user.firstName,
          lastName:result.user.lastName,
          email:result.user.email,
          gender:result.user.gender,
          phoneNumber:result.user.phoneNumber
        }
        this.store.dispatch(createUser({user}))
      }
    });
  }

  async openFirstNameDialog(item: any) {
    this.isTab = true;
    this.item = item;
  }

  setState() {
    let users = this.db.users.toArray();
    users.then((users:User[]) => {
      console.log(users)
      this.store.dispatch(getAllUsers({users}))
    });
  }

  searchUser(value:any) {
    if (value) {
      const searchUser = value.toLowerCase();
      this.searchUsers = this.list.filter((item: any) =>
        item.email.toLowerCase().includes(searchUser)
      );
    }
    else {
      this.searchUsers = this.list
    }
  }

  closeFirstNameDialog() {
    this.isTab = false;
  }
}

