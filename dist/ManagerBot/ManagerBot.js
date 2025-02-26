"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerBot = void 0;
const PromiseQueue_1 = require("./PromiseQueue");
const events_1 = require("events");
class ManagerBot {
    constructor(bot) {
        this.bot = bot;
        this.chats = new Map();
        this.currentMessageCount = 0;
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
    sendMessage(message) {
        this.currentMessageCount++;
        this.sleep(this.currentMessageCount > 20 ? 1000 : 500);
        const chatById = this.chats.get(message.chat.id);
        if (chatById === undefined) {
            throw new Error('Specify chatId via managerBot.addChat(chatId) to sendMessage for specific chat');
        }
        return chatById.promiseQueue.next(async () => {
            try {
                const meta = await this.bot.sendMessage(message);
                this.currentMessageCount--;
                return meta;
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
        this.sleep(200);
        if (this.bot.updateMessage === undefined) {
            console.warn(`'${this.bot.type}' doesn't support updating message. Provide isNewMessageEveryRender prop to Root component`);
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