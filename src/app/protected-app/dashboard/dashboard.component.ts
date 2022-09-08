import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {




  constructor(private router: Router,
   private authService: AuthService) { }


   get usuario()
   {
    return this.authService.user;
   }

   logOut()
   {
    this.router.navigateByUrl('/auth');
    this.authService.logOut();
   }

}
