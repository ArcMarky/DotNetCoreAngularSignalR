"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GroupChatComponent = /** @class */ (function () {
    function GroupChatComponent(_employeeService, toastr, signalRService) {
        this._employeeService = _employeeService;
        this.toastr = toastr;
        this.signalRService = signalRService;
        this.chatmessages = [];
    }
    GroupChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.signalrConnectionEstablished$ = this.signalRService.connectionEstablished$;
        this.signalRService.messageReceived$.subscribe(function (message) {
            _this.chatmessages = __spreadArrays(_this.chatmessages, [message]);
        });
    };
    GroupChatComponent.prototype.sendChat = function (message) {
        this.signalRService.sendChatMessage(message);
    };
    GroupChatComponent = __decorate([
        core_1.Component({
            selector: 'app-groupchat',
            templateUrl: './groupchat.component.html'
        })
    ], GroupChatComponent);
    return GroupChatComponent;
}());
exports.GroupChatComponent = GroupChatComponent;
//# sourceMappingURL=groupchat.component.js.map