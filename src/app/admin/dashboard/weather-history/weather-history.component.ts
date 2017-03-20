import { Component, OnInit, ViewChild } from '@angular/core';


import { WeatherService } from '../../../../services';

import * as moment from 'moment';

@Component({
  selector: 'app-weather-history',
  templateUrl: './weather-history.component.html',
  styles: [],
  viewProviders: [ WeatherService ]  
})
export class WeatherHistoryComponent implements OnInit {
  private q: string;
  private dateStart: any;
  private dateEnd: any;
  private weatherData: any;
  @ViewChild('myTable') table: any;

  columns = [
    { name: 'date' },
    { name: 'mintempC' },
    { name: 'maxtempC' }
  ];

  constructor(
    private weatherService: WeatherService,
  ) {
    this.dateStart = moment().toDate();
    this.dateEnd = moment().toDate();
  }

  ngOnInit() {
  }

  showData() {
    let ds = moment(this.dateStart).format('YYYY-MM-DD');
    let de = moment(this.dateEnd).format('YYYY-MM-DD');
    this.weatherService.getWeatherHistory(this.q, ds, de).subscribe(
      (response: any) => {
        this.weatherData = response.data.weather;
      }
    )
  }

  onPage(event) {
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}
