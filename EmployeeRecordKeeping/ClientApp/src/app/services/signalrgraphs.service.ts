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

export class SignalRGraphsService {
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

  getHeartRate(): Promise<ApiResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._httpService.get2(`${this.apiUrl}HeartRate/GetHeartRate`, { headers: headers })
      .map((response: Response) => <ApiResponse>response.json()).toPromise()
      .catch(err => { return this._httpService.handleError(err); });
  }
 

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/ecgdata')
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
    this.hubConnection.on('GetEcgData', (type: any, payload: any) => {
      console.log(JSON.stringify(payload));
      this.priorityNumberRecieved$.next(payload);
    });
  }
}
