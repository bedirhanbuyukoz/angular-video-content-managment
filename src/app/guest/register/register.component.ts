import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { User } from "../../models/user.model";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.authenticationService.register(this.user).subscribe(data => {
        this.router.navigate(['/login']);
      }, err => {
        if (err?.status === 409) {
          this.errorMessage = 'Username already exist.';
        } else {
          this.errorMessage ='Unexpected error occurred. Error is:' + err?.errorMessage;
          console.log(err);
        }
      })
  }
}
