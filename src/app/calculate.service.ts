import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  operator = '';
  operand1: number; // The first operand
  operand2: number; // The second operand

  constructor(private http: HttpClient) { }

  getResult(values: string){
    console.log(values);
    return this.http.get(environment.apiEndpoint + '/calculate?values=' + values);  
  }
}
