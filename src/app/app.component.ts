import { Component } from '@angular/core';
import { User } from "./models/user.model";
import { AuthenticationService } from "./services/authentication.service";
import {Role} from "./models/role.enum";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'video-content-managment';

  currentUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private router: Router ){
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }


  isAdmin(){
    return this.currentUser?.role === Role.ADMIN;
  }



  logOut(){
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

}
