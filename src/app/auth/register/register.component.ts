import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { iUser } from '../../interfaces/i-user';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private formB: FormBuilder
  ) {}

  formGroup!: FormGroup;
  register() {
    this.authSvc.register(this.formGroup.getRawValue()).subscribe({
      next: (resp) => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }

  ngOnInit() {
    this.formGroup = this.formB.group({
      nome: this.formB.control(''),
      email: this.formB.control(''),
      password: this.formB.control(''),
    });
  }
}
