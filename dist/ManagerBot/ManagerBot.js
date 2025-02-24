"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerBot = void 0;
const PromiseQueue_1 = require("./PromiseQueue");
const events_1 = require("events");
class ManagerBot {
    constructor(bot) {
        this.bot = bot;
        this.chats = new Map();
        this.messageQueue = [];
        this.messageUpdateQueue = [];
        this.processUpdate = (event) => {
            this.eventEmitter.emit('any', event);
            this.eventEmitter.emit(event.type, event);
            const { id } = event.chat;
            const chat = this.chats.get(id);
            if (chat === undefined) {
                return;
            }
            chat.eventEmitter.emit('any', event);
            chat.eventEmitter.emit(event.type, event);
        };
        this.eventEmitter = new events_1.EventEmitter();
        bot.processUpdate = this.processUpdate;
        setInterval(async () => {
            if (this.messageQueue.length) {
                const messages = this.messageQueue.splice(0, this.messageQueue.length > 15 ? 15 : this.messageQueue.length);
                for (const message of messages) {
                    const result = this.executeSendMessage(message.message);
                    (message === null || message === void 0 ? void 0 : message.callback) && (message === null || message === void 0 ? void 0 : message.callback(result));
                }
            }
            if (this.messageUpdateQueue.length) {
                const updates = this.messageUpdateQueue.splice(0, this.messageUpdateQueue.length > 10 ? 10 : this.messageUpdateQueue.length);
                for (const message of updates) {
                    await this.executeUpdateMessage(message);
                }
            }
        }, 30000);
    }
    addChat(id) {
        this.chats.set(id, {
            promiseQueue: new PromiseQueue_1.PromiseQueue(),
            eventEmitter: new events_1.EventEmitter(),
        });
    }
    deleteChat(id) {
        this.chats.delete(id);
    }
    on(eventName, listener, chatId) {
        if (chatId === undefined) {
            return this.eventEmitter.on(eventName, listener);
        }
        else {
            const chat = this.chats.get(chatId);
            if (chat === undefined) {
                throw new Error('Specify chatId via managerBot.addChat(chatId) to subscribe on messages for specific chat');
            }
            return chat.eventEmitter.on(eventName, listener);
        }
    }
    emit(eventName, event, chatId) {
        this.eventEmitter.emit('any', event);
        this.eventEmitter.emit(eventName, event);
        if (chatId !== undefined) {
            const chat = this.chats.get(chatId);
            if (chat === undefined) {
                throw new Error('Specify chatId via managerBot.addChat(chatId) to emit messages for specific chat');
            }
            chat.eventEmitter.emit('any', event);
            chat.eventEmitter.emit(event.type, event);
        }
    }
    removeListener(eventName, listener, chatId) {
        if (chatId === undefined) {
            return this.eventEmitter.removeListener(eventName, listener);
        }
        else {
            const chat = this.chats.get(chatId);
            if (chat === undefined) {
                throw new Error('Specify chatId via managerBot.addChat(chatId) to sendMessage for specific chat');
            }
            return chat.eventEmitter.removeListener(eventName, listener);
        }
    }
    sendMessage(message, callback) {
        const chatById = this.chats.get(message.chat.id);
        // this.sleep(200);
        if (chatById === undefined) {
            throw new Error('Specify chatId via managerBot.addChat(chatId) to sendMessage for specific chat');
        }
        this.messageQueue.push({
            message,
            callback,
        });
    }
    executeSendMessage(message) {
        const chatById = this.chats.get(message.chat.id);
        if (chatById === undefined) {
            throw new Error('Specify chatId via managerBot.addChat(chatId) to sendMessage for specific chat');
        }
        return chatById.promiseQueue.next(async () => {
            try {
                return await this.bot.sendMessage(message);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    sleep(ms) {
        const sharedArray = new Int32Array(new SharedArrayBuffer(4));
        Atomics.wait(sharedArray, 0, 0, ms);
    }
    async updateMessage(message) {
        this.messageUpdateQueue.push(message);
    }
    async executeUpdateMessage(message) {
        if (this.bot.updateMessage === undefined) {
            console.error(`'${this.bot.type}' doesn't support updating message. Provide isNewMessageEveryRender prop to Root component`);
            return;
        }
        try {
            return await this.bot.updateMessage(message);
        }
        catch (e) {
            console.error(e);
        }
    }
    async deleteMessage(message) {
        this.sleep(200);
        if (this.bot.deleteMessage === undefined) {
            console.error(`'${this.bot.type}' doesn't support deleting message. Provide isNewMessageEveryRender prop to Root component`);
            return;
        }
        try {
            return await this.bot.deleteMessage(message);
        }
        catch (e) {
            console.error(e);
        }
    }
}
exports.ManagerBot = ManagerBot;
//# sourceMappingURL=ManagerBot.js.map