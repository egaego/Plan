import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { HelpersProvider } from '../helpers/helpers';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  
  API_URL : string;

  constructor(private http: HTTP, private helpersProvider: HelpersProvider) {
    console.log('Hello ApiProvider Provider');
    
    this.API_URL = this.helpersProvider.getBaseUrl() + 'api/v1/';
  }
  
  get(url: string, params?: any, headers?: any) {
    this.http.setDataSerializer('json');
    return this.http.get(this.API_URL + url, params, headers);
  }
  
  post(url: string, params?: any, headers?: any) {
    this.http.setDataSerializer('json');
    return this.http.post(this.API_URL + url, params, headers);
  }
  
  patch(url: string, params?: any, headers?: any) {
    this.http.setDataSerializer('json');
    return this.http.patch(this.API_URL + url, params, headers);
  }
  
  delete(url: string, params?: any, headers?: any) {
    this.http.setDataSerializer('json');
    return this.http.delete(this.API_URL + url, params, headers);
  }

}
