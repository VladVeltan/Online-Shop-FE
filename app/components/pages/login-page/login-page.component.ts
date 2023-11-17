import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenResponse } from 'src/app/modules/shared/types/token.tyes';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          (response: TokenResponse) => {
            console.log(response);
            if (response && response.access_token) {
              localStorage.setItem('token', response.access_token);

              ///localStorage.setItem('roles',JSON.stringify(this.authService.getUserProfile().subscribe()));
              this.authService.getUserProfile().subscribe(
                (profile: any) => {
                  if (profile && profile.roles) {
                    const roles = profile.roles;
                    localStorage.setItem('roles', JSON.stringify(roles));
                  }})
            }
            this.router.navigate(['/products']);
          },
          (error) => {
            console.error('Login failed:', error);
            alert('Login failed');
          }
        );
    }
  }
}
