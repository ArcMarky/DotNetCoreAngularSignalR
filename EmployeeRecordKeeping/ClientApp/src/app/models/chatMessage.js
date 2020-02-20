"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatMessage = /** @class */ (function () {
    function ChatMessage(message) {
        if (message === void 0) { message = ''; }
        this.message = message;
        this.sent = new Date().toISOString();
    }
    return ChatMessage;
}());
exports.ChatMessage = ChatMessage;
var PriorityNumberMessage = /** @class */ (function () {
    function PriorityNumberMessage() {
    }
    return PriorityNumberMessage;
}());
exports.PriorityNumberMessage = PriorityNumberMessage;
//# sourceMappingURL=chatMessage.js.map