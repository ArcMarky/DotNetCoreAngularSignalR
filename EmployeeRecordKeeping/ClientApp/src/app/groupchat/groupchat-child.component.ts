import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { EmployeeList } from '../models/employee';
import { ToastrService } from 'ngx-toastr';
import { datatable } from 'datatables'
import { elasticListFilter, elasticSearchResultsSummary } from '../models/elasticsearch';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChatMessage } from '../models/chatMessage';

@Component({
  selector: 'app-groupchatchild',
  templateUrl: './groupchat-child.component.html'
})

export class GroupChatChildComponent implements OnInit {
  @Input() chatmessages = [];
  @Input() connectionEstablished = false;
  @Output() sendChat = new EventEmitter();
  constructor(formbuilder: FormBuilder) {
    this.form = formbuilder.group({
      chatmessage: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }

  form: FormGroup;


  send() {
    this.sendChat.emit(new ChatMessage(this.form.value.chatmessage));
    this.form.reset();
  }
}
