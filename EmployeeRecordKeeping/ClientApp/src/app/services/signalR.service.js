"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var signalr_1 = require("@microsoft/signalr");
var rxjs_1 = require("rxjs");
var SignalRService = /** @class */ (function () {
    function SignalRService() {
        this.foodchanged$ = new rxjs_1.Subject();
        this.messageReceived$ = new rxjs_1.Subject();
        this.newCpuValue$ = new rxjs_1.Subject();
        this.connectionEstablished$ = new rxjs_1.BehaviorSubject(false);
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }
    SignalRService.prototype.sendChatMessage = function (message) {
        this.hubConnection.invoke('SendMessage', message);
    };
    SignalRService.prototype.createConnection = function () {
        this.hubConnection = new signalr_1.HubConnectionBuilder()
            .withUrl('https://localhost:5001/coolmessages')
            .withAutomaticReconnect()
            .configureLogging(signalr_1.LogLevel.Information)
            .build();
    };
    SignalRService.prototype.startConnection = function () {
        var _this = this;
        if (this.hubConnection.state === signalr_1.HubConnectionState.Connected) {
            return;
        }
        this.hubConnection.start().then(function () {
            console.log('Hub connection started!');
            _this.connectionEstablished$.next(true);
        }, function (error) { return console.error(error); });
    };
    SignalRService.prototype.registerOnServerEvents = function () {
        var _this = this;
        this.hubConnection.on('Send', function (data) {
            console.log('data', data);
            _this.messageReceived$.next(data);
        });
    };
    SignalRService = __decorate([
        core_1.Injectable()
    ], SignalRService);
    return SignalRService;
}());
exports.SignalRService = SignalRService;
//# sourceMappingURL=signalR.service.js.map