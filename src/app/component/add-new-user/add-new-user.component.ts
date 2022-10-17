import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,) { 
      this.userForm = this.fb.group({
        firstName: new FormControl('', {
        }),
        lastName: new FormControl('', {
        }),
        email: new FormControl(''),
        gender: new FormControl('',{
        }),
        phoneNumber: new FormControl('')
        });
    }

  ngOnInit(): void {
  }

  createNewUser() {
    this.dialogRef.close({ user: this.userForm.value });
  }
}
