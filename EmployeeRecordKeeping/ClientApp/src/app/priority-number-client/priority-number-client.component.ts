import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { EmployeeList } from '../models/employee';
import { ToastrService } from 'ngx-toastr';
import { datatable } from 'datatables'
import { elasticListFilter, elasticSearchResultsSummary } from '../models/elasticsearch';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChatMessage } from '../models/chatMessage';
import { MessageService } from 'primeng/api';
import signalR = require('@microsoft/signalr');
import { PriorityNumberService } from '../services/prioritynumber.service';
import { PriorityMessage } from '../models/message';
import { Observable } from 'rxjs';
import { HubConnectionState } from '@microsoft/signalr';
import * as $ from 'jquery';



@Component({
  selector: 'app-priority-number-client',
  templateUrl: './priority-number-client.component.html'
})

export class PriorityNumberClientComponent implements OnInit {
  public nowServingNumber: any = 0;
  public originalServingNumber: number = 0;
  public messageModel: PriorityMessage = new PriorityMessage();
  signalrConnectionEstablished$: Observable<boolean>;

  constructor(private _priorityNumberService: PriorityNumberService) {

  }
  ngOnInit(): void {

    this.signalrConnectionEstablished$ = this._priorityNumberService.connectionEstablished$;
    this._priorityNumberService.priorityNumberRecieved$.subscribe(message => {
      this.nowServingNumber = message;
      (<any>$("#activateVoice")).click();
    });
  }


}
