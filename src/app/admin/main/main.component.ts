import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../services';

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
      title: 'Dashboard',
      route: '/admin/dashboard',
      icon: 'dashboard',
    }, 
  ];

  private userProfile: any;

  constructor(private _router: Router, private auth: Auth) {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
  }

  logout(): void {
    this.auth.logout();
    this._router.navigate(['']);
  }
}
