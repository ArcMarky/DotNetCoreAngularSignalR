"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var message_1 = require("../models/message");
var PriorityNumberComponent = /** @class */ (function () {
    function PriorityNumberComponent(messageService, _priorityNumberService) {
        this.messageService = messageService;
        this._priorityNumberService = _priorityNumberService;
        this.nowServingNumber = 0;
        this.originalServingNumber = 0;
        this.messageModel = new message_1.PriorityMessage();
    }
    PriorityNumberComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resetNumber();
        this.signalrConnectionEstablished$ = this._priorityNumberService.connectionEstablished$;
        this._priorityNumberService.priorityNumberRecieved$.subscribe(function (message) {
            _this.nowServingNumber = message;
        });
    };
    PriorityNumberComponent.prototype.nextNumber = function () {
        var _this = this;
        this.messageModel.type = "queuenumber";
        this.messageModel.payLoad = "";
        this._priorityNumberService.generateNewPriorityNumber(this.messageModel, this.nowServingNumber + 1).then(function (res) {
            _this.nowServingNumber = res;
        });
        this.originalServingNumber = this.nowServingNumber;
    };
    PriorityNumberComponent.prototype.resetNumber = function () {
        var _this = this;
        this._priorityNumberService.deleteAllPriorityNumber().then(function (res) {
            _this.nowServingNumber = 0;
        });
    };
    PriorityNumberComponent = __decorate([
        core_1.Component({
            selector: 'app-priority-number',
            templateUrl: './priority-number.component.html'
        })
    ], PriorityNumberComponent);
    return PriorityNumberComponent;
}());
exports.PriorityNumberComponent = PriorityNumberComponent;
//# sourceMappingURL=priority-number.component.js.map