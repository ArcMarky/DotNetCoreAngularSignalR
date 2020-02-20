"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var chatMessage_1 = require("../models/chatMessage");
var GroupChatChildComponent = /** @class */ (function () {
    function GroupChatChildComponent(formbuilder) {
        this.chatmessages = [];
        this.connectionEstablished = false;
        this.sendChat = new core_1.EventEmitter();
        this.form = formbuilder.group({
            chatmessage: ['', forms_1.Validators.required]
        });
    }
    GroupChatChildComponent.prototype.ngOnInit = function () {
    };
    GroupChatChildComponent.prototype.send = function () {
        this.sendChat.emit(new chatMessage_1.ChatMessage(this.form.value.chatmessage));
        this.form.reset();
    };
    __decorate([
        core_1.Input()
    ], GroupChatChildComponent.prototype, "chatmessages", void 0);
    __decorate([
        core_1.Input()
    ], GroupChatChildComponent.prototype, "connectionEstablished", void 0);
    __decorate([
        core_1.Output()
    ], GroupChatChildComponent.prototype, "sendChat", void 0);
    GroupChatChildComponent = __decorate([
        core_1.Component({
            selector: 'app-groupchatchild',
            templateUrl: './groupchat-child.component.html'
        })
    ], GroupChatChildComponent);
    return GroupChatChildComponent;
}());
exports.GroupChatChildComponent = GroupChatChildComponent;
//# sourceMappingURL=groupchat-child.component.js.map