import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, UserInfo } from './user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>User Details</h2>
      <div *ngIf="!isEditing">
        <div class="form-group">
          <label>Name:</label>
          <p>{{ userInfo?.name }}</p>
        </div>
        <div class="form-group">
          <label>Email:</label>
          <p>{{ userInfo?.email }}</p>
        </div>
        <button (click)="toggleEdit()">Edit</button>
      </div>

      <form *ngIf="isEditing" [formGroup]="editForm" (ngSubmit)="onSave()">
        <div class="form-group">
          <label for="name">Name:</label>
          <input id="name" type="text" formControlName="name">
          <div class="error" *ngIf="editForm.get('name')?.touched && editForm.get('name')?.errors?.['required']">
            Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" formControlName="email">
          <div class="error" *ngIf="editForm.get('email')?.touched && editForm.get('email')?.errors?.['required']">
            Email is required
          </div>
          <div class="error" *ngIf="editForm.get('email')?.touched && editForm.get('email')?.errors?.['email']">
            Please enter a valid email
          </div>
        </div>

        <button type="submit" [disabled]="!editForm.valid">Save</button>
        <button type="button" (click)="toggleEdit()" style="margin-left: 10px; background-color: #6c757d;">Cancel</button>
      </form>
    </div>
  `
})
export class UserDetailsComponent implements OnInit {
  userInfo: UserInfo | null = null;
  isEditing = false;
  editForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.userInfo = this.userService.getUserInfo();
    if (!this.userInfo) {
      this.router.navigate(['/']);
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing && this.userInfo) {
      this.editForm.patchValue({
        name: this.userInfo.name,
        email: this.userInfo.email,
        password: this.userInfo.password
      });
    }
  }

  onSave() {
    if (this.editForm.valid) {
      this.userService.setUserInfo(this.editForm.value);
      this.userInfo = this.editForm.value;
      this.isEditing = false;
    }
  }
}