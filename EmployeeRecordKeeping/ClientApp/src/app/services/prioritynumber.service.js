"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var signalr_1 = require("@microsoft/signalr");
var rxjs_1 = require("rxjs");
var PriorityNumberService = /** @class */ (function () {
    function PriorityNumberService(_httpService, _router, http) {
        this._httpService = _httpService;
        this._router = _router;
        this.http = http;
        this.priorityNumberRecieved$ = new rxjs_1.Subject();
        this.connectionEstablished$ = new rxjs_1.BehaviorSubject(false);
        this.apiUrl = "api/";
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }
    PriorityNumberService.prototype.generateNewPriorityNumber = function (model, priorityNumber) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var postBody = JSON.stringify(model);
        return this._httpService.post(this.apiUrl + "PriorityNumber/NewPriorityNumber", postBody, { headers: headers })
            .map(function (response) { return response.json(); }).toPromise()
            .catch(function (err) { return _this._httpService.handleError(err); });
    };
    PriorityNumberService.prototype.deleteAllPriorityNumber = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._httpService.delete(this.apiUrl + "PriorityNumber/DeleteAllPriorityNumber", { headers: headers })
            .map(function (response) { return response.json(); }).toPromise()
            .catch(function (err) { return _this._httpService.handleError(err); });
    };
    PriorityNumberService.prototype.createConnection = function () {
        this.hubConnection = new signalr_1.HubConnectionBuilder()
            .withUrl('https://localhost:5001/queuenumber')
            .withAutomaticReconnect()
            .configureLogging(signalr_1.LogLevel.Information)
            .build();
    };
    PriorityNumberService.prototype.startConnection = function () {
        var _this = this;
        if (this.hubConnection.state === signalr_1.HubConnectionState.Connected) {
            return;
        }
        this.hubConnection.start().then(function () {
            console.log('Hub connection started!');
            _this.connectionEstablished$.next(true);
        }, function (error) { return console.error(error); });
    };
    PriorityNumberService.prototype.registerOnServerEvents = function () {
        var _this = this;
        this.hubConnection.on('QueueMessage', function (type, payload) {
            _this.priorityNumberRecieved$.next(payload);
        });
    };
    PriorityNumberService = __decorate([
        core_1.Injectable()
    ], PriorityNumberService);
    return PriorityNumberService;
}());
exports.PriorityNumberService = PriorityNumberService;
//# sourceMappingURL=prioritynumber.service.js.map