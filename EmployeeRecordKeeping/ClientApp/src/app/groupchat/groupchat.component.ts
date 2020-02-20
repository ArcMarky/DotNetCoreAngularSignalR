import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { EmployeeList } from '../models/employee';
import { ToastrService } from 'ngx-toastr';
import { datatable } from 'datatables'
import { elasticListFilter, elasticSearchResultsSummary } from '../models/elasticsearch';
import { SignalRService } from '../services/signalR.service';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chatMessage';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.component.html'
})

export class GroupChatComponent implements OnInit {
  signalrConnectionEstablished$: Observable<boolean>;
  chatmessages = [];
  constructor(private _employeeService: EmployeeService, private toastr: ToastrService, private readonly signalRService: SignalRService) {

  }
  ngOnInit(): void {
    this.signalrConnectionEstablished$ = this.signalRService.connectionEstablished$;
    this.signalRService.messageReceived$.subscribe(message => {
      this.chatmessages = [...this.chatmessages, message];
    });

  }

  sendChat(message: ChatMessage) {
    this.signalRService.sendChatMessage(message);
  }

}
