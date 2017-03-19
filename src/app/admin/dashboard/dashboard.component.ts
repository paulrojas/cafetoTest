import { Component, AfterViewInit } from '@angular/core';

import { Title }     from '@angular/platform-browser';

//import { WeatherComponent } from './weather/weather.component';

import { Auth } from '../../../services';



import { multi } from './data';

@Component({
  selector: 'qs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  //viewProviders: [ WeatherService ],
})
export class DashboardComponent implements AfterViewInit {
  private currentLocation = 'Barranquilla';

  constructor(
    private auth: Auth,
  ) {
  }

  ngAfterViewInit(): void {
  }
}
