import { Injectable } from '@angular/core';
import { Headers, Response, URLSearchParams, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map';
import { ApiResponse } from '../models/common';
import { EmployeeList } from '../models/employee';
import { elasticListFilter } from '../models/elasticsearch';
import { PriorityMessage } from '../models/message';
import { PriorityNumberMessage } from '../models/chatMessage';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()

export class PriorityNumberService {
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

  generateNewPriorityNumber(model: PriorityMessage, priorityNumber: string): Promise<ApiResponse> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const postBody = JSON.stringify(model);
    return this._httpService.post(`${this.apiUrl}PriorityNumber/NewPriorityNumber`, postBody, { headers: headers })
      .map((response: Response) => <ApiResponse>response.json()).toPromise()
      .catch(err => { return this._httpService.handleError(err); });
  }
  deleteAllPriorityNumber(): Promise<ApiResponse> {
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._httpService.delete(`${this.apiUrl}PriorityNumber/DeleteAllPriorityNumber`, { headers: headers })
      .map((response: Response) => <ApiResponse>response.json()).toPromise()
      .catch(err => { return this._httpService.handleError(err); });
  }



  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/queuenumber')
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
    this.hubConnection.on('QueueMessage', (type: string, payload: string) => {
      this.priorityNumberRecieved$.next(payload);
    });
  }
}
