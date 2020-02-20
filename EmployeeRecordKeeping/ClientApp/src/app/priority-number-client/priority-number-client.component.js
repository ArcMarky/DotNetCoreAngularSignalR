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
var $ = require("jquery");
var PriorityNumberClientComponent = /** @class */ (function () {
    function PriorityNumberClientComponent(_priorityNumberService) {
        this._priorityNumberService = _priorityNumberService;
        this.nowServingNumber = 0;
        this.originalServingNumber = 0;
        this.messageModel = new message_1.PriorityMessage();
    }
    PriorityNumberClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.signalrConnectionEstablished$ = this._priorityNumberService.connectionEstablished$;
        this._priorityNumberService.priorityNumberRecieved$.subscribe(function (message) {
            _this.nowServingNumber = message;
            $("#activateVoice").click();
        });
    };
    PriorityNumberClientComponent = __decorate([
        core_1.Component({
            selector: 'app-priority-number-client',
            templateUrl: './priority-number-client.component.html'
        })
    ], PriorityNumberClientComponent);
    return PriorityNumberClientComponent;
}());
exports.PriorityNumberClientComponent = PriorityNumberClientComponent;
//# sourceMappingURL=priority-number-client.component.js.map