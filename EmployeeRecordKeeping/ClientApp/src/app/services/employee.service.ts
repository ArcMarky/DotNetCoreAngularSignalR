import { Injectable } from '@angular/core';
import { Headers, Response, URLSearchParams, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map';
import { ApiResponse } from '../models/common';
import { EmployeeList } from '../models/employee';
import { elasticListFilter } from '../models/elasticsearch';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable()

export class EmployeeService {
  private apiUrl: string;
  priorityNumberRecieved$ = new Subject();
  connectionEstablished$ = new BehaviorSubject<boolean>(false);
  private hubConnection: HubConnection;

  constructor(private _httpService: HttpService, private _router: Router, private http: Http) {
    this.apiUrl = "api/";
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  getEmployeesWithoutLoading(): Promise<ApiResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._httpService.get2(`${this.apiUrl}Employee/GetEmployeeList`, { headers: headers })
      .map((response: Response) => <ApiResponse>response.json()).toPromise()
      .catch(err => { return this._httpService.handleError(err); });
  }
  getEmployees(): Promise<ApiResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._httpService.get(`${this.apiUrl}Employee/GetEmployeeList`, { headers: headers })
      .map((response: Response) => <ApiResponse>response.json()).toPromise()
      .catch(err => { return this._httpService.handleError(err); });
  }
  saveEmployee(model: EmployeeList): Promise<ApiResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const postBody = JSON.stringify(model);
    return this._httpService.post(`${this.apiUrl}Employee/SaveEmployee`, postBody, { headers: headers })
      .map((response: Response) => <ApiResponse>response.json()).toPromise()
      .catch(err => { return this._httpService.handleError(err); });
  }
  searchIndexedEmployee(model: elasticListFilter): Promise<ApiResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const postBody = JSON.stringify(model);
    return this._httpService.post(`${this.apiUrl}Employee/SearchIndexedEmployees`, postBody, { headers: headers })
      .map((response: Response) => <ApiResponse>response.json()).toPromise()
      .catch(err => { return this._httpService.handleError(err); });
  }
  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/newemployeecreated')
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
  }

  private startConnection() {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    this.hubConnection.start().then(
      () => {
        console.log('Hub connection started!');
        this.connectionEstablished$.next(true);
      },
      error => console.error(error)
    );
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('EmployeeCreated', (type: string, payload: string) => {
      this.priorityNumberRecieved$.next(payload);
    });
  }
}
