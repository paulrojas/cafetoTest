/**
 * Adicionar documentacion antes de enviar
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WeatherService {
  constructor(private http: Http) { }

  getWeather(location: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('q', location);
    params.set('num_of_days', '1');
    params.set('format', 'json');
    params.set('key', 'e256124eca184e7796424854171303');

    return this.http.get( 'http://api.worldweatheronline.com/premium/v1/weather.ashx', { search: params } )
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    var serverError = error.json();
    var modelStateErrors: string = '';

    if (!serverError.type) {
      console.log(serverError);
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }
}