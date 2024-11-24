import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>User Registration</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name:</label>
          <input id="name" type="text" formControlName="name">
          <div class="error" *ngIf="userForm.get('name')?.touched && userForm.get('name')?.errors?.['required']">
            Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" formControlName="email">
          <div class="error" *ngIf="userForm.get('email')?.touched && userForm.get('email')?.errors?.['required']">
            Email is required
          </div>
          <div class="error" *ngIf="userForm.get('email')?.touched && userForm.get('email')?.errors?.['email']">
            Please enter a valid email
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" type="password" formControlName="password">
          <div class="error" *ngIf="userForm.get('password')?.touched && userForm.get('password')?.errors?.['required']">
            Password is required
          </div>
          <div class="error" *ngIf="userForm.get('password')?.touched && userForm.get('password')?.errors?.['minlength']">
            Password must be at least 6 characters
          </div>
        </div>

        <button type="submit" [disabled]="!userForm.valid">Submit</button>
      </form>
    </div>
  `
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.setUserInfo(this.userForm.value);
      this.router.navigate(['/details']);
    }
  }
}