import { Component } from '@angular/core';
import { Auth } from '../../services';

@Component({
  selector: 'qs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private auth: Auth) {}
}