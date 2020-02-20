import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './services/employee.service';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { ReactiveFormsModule } from '@angular/forms'
import {
  MatButtonModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatCardModule, MatIconModule, MatDialogModule, MatInputModule, MatRadioModule, MatTableModule,
  MatCheckboxModule, MatTabsModule, MatSelectModule, MatOptionModule, MatProgressSpinnerModule, MatExpansionModule, MatProgressBarModule, MatNativeDateModule,
  MatAutocompleteModule, MatTooltipModule, MatDatepickerModule, MatSnackBarModule, MatSliderModule
} from '@angular/material';
import { GroupChatComponent } from './groupchat/groupchat.component';
import { GroupChatChildComponent } from './groupchat/groupchat-child.component';
import { SignalRService } from './services/signalR.service';
import { PriorityNumberComponent } from './priority-number/priority-number.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PriorityNumberService } from './services/prioritynumber.service';
import { PriorityNumberClientComponent } from './priority-number-client/priority-number-client.component';
import { SignalRGraphsComponent } from './signalrgraphs/signalrgraphs.component';
import { SignalRGraphsService } from './services/signalrgraphs.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    EmployeeComponent,
    GroupChatComponent,
    GroupChatChildComponent,
    PriorityNumberComponent,
    PriorityNumberClientComponent,
    SignalRGraphsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpModule,
    NgxSpinnerModule,
    DataTablesModule,
    ToastModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatCardModule, MatIconModule, MatDialogModule, MatInputModule, MatRadioModule, MatTableModule,
    MatCheckboxModule, MatTabsModule, MatSelectModule, MatOptionModule, MatProgressSpinnerModule, MatExpansionModule, MatProgressBarModule, MatNativeDateModule, MatSnackBarModule, MatSliderModule,
    MatAutocompleteModule, MatTooltipModule, MatDatepickerModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'employee', component: EmployeeComponent },
      { path: 'groupchat', component: GroupChatComponent },
      { path: 'prioritynumber', component: PriorityNumberComponent },
      { path: 'prioritynumberclient', component: PriorityNumberClientComponent },
      { path: 'signalrgraphs', component: SignalRGraphsComponent },
    ])
  ],
  providers: [EmployeeService, HttpService, SignalRService, MessageService, PriorityNumberService,SignalRGraphsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
