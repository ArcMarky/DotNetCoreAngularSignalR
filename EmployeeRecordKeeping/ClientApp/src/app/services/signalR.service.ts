import { Injectable } from '@angular/core';

import { ChatMessage } from '../models/chatMessage';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SignalRService {
  foodchanged$ = new Subject();
  messageReceived$ = new Subject<ChatMessage>();
  newCpuValue$ = new Subject<number>();
  connectionEstablished$ = new BehaviorSubject<boolean>(false);

  private hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendChatMessage(message: ChatMessage) {
    this.hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/coolmessages')
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
  

    this.hubConnection.on('Send', (data: any) => {
      console.log('data', data);
      this.messageReceived$.next(data);
    });

 
  }
}
