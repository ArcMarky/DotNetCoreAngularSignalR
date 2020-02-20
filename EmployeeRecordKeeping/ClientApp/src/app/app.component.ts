import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { MessageService } from 'primeng/api';
import signalR = require('@microsoft/signalr');

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {

  }
  title = 'app'; 
}
