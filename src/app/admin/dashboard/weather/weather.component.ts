import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../../../../services';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styles: [`
    .info {
      color: #1976d2;
    }
  `],
  viewProviders: [ WeatherService ]  
})
export class WeatherComponent implements OnInit {
  private weatherData: any;
  @Input() myLocation: string;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.getWeather(this.myLocation);
  }

  getWeatherUsingGPS() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let p: string = position.coords.latitude + ',' + position.coords.longitude;
        this.getWeather(p);
      },
      (err) => {
        alert("We won't be able to get the weather's data without your authorization to get your current location.");
      }
    );    
  }

  getWeather(q: string) {
    this.weatherService.getWeather(q).subscribe(
      (response: any) => {
        this.weatherData = 
          {
            location: response.data.request[0].query,
            date: response.data.weather[0].date,
            temp: response.data.current_condition[0].temp_C,
            weatherDesc: response.data.current_condition[0].weatherDesc[0].value,
            tempMaxC: response.data.weather[0].maxtempC,
            tempMinC: response.data.weather[0].mintempC,
            cloudcover: response.data.current_condition[0].cloudcover,
            humidity: response.data.current_condition[0].humidity,
            observation_time: response.data.current_condition[0].observation_time,
            precipMM: response.data.current_condition[0].precipMM,
            pressure: response.data.current_condition[0].pressure,
            visibility: response.data.current_condition[0].visibility,
            winddir16Point: response.data.current_condition[0].winddir16Point,
            winddirDegree: response.data.current_condition[0].winddirDegree,
            windspeed: response.data.current_condition[0].windspeedKmph,
            icon: response.data.current_condition[0].weatherIconUrl[0].value,
          };
      }
    )
  }
}
