import { PromiseQueue } from './PromiseQueue';
import { EventEmitter } from 'events';
import { ProcessUpdate, UrbanBot, UrbanBotType } from '../types/UrbanBot';
import { UrbanExistingMessage, UrbanMessage } from '../types/Messages';
import { UrbanListener } from '../types';
import { UrbanSyntheticEvent } from '../types/Events';

type Chat = {
    eventEmitter: EventEmitter;
    promiseQueue: PromiseQueue;
};

type SendMessageQueueType = {
    message: UrbanMessage;
    callback?: (result: Promise<ManagerBot<UrbanBotType>['sendMessage']>) => void;
};

export class ManagerBot<BotType extends UrbanBotType = UrbanBotType> {
    private chats = new Map<string, Chat>();
    private eventEmitter: EventEmitter;
    private messageQueue: SendMessageQueueType[] = [];
    private messageUpdateQueue: UrbanExistingMessage<BotType>[] = [];

    constructor(private bot: UrbanBot<BotType>) {
        this.eventEmitter = new EventEmitter();

        bot.processUpdate = this.processUpdate;
        setInterval(async () => {
            if (this.messageQueue.length) {
                const messages = this.messageQueue.splice(
                    0,
                    this.messageQueue.length > 15 ? 15 : this.messageQueue.length,
                );
                for (const message of messages) {
                    const result = this.executeSendMessage(message.message);
                    message?.callback && message?.callback(result);
                }
            }
            if (this.messageUpdateQueue.length) {
                const updates = this.messageUpdateQueue.splice(
                    0,
                    this.messageUpdateQueue.length > 10 ? 10 : this.messageUpdateQueue.length,
                );
                for (const message of updates) {
                    await this.executeUpdateMessage(message);
                }
            }
        }, 30000);
    }

    processUpdate: ProcessUpdate<BotType> = (event) => {
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

    addChat(id: string) {
        this.chats.set(id, {
            promiseQueue: new PromiseQueue(),
            eventEmitter: new EventEmitter(),
        });
    }

    deleteChat(id: string) {
        this.chats.delete(id);
    }

    on<Event extends UrbanSyntheticEvent<BotType> = UrbanSyntheticEvent<BotType>>(
        eventName: Event['type'] | 'any',
        listener: UrbanListener<Event>,
        chatId?: string,
    ) {
        if (chatId === undefined) {
            return this.eventEmitter.on(eventName, listener);
        } else {
            const chat = this.chats.get(chatId);
            if (chat === undefined) {
                throw new Error(
                    'Specify chatId via managerBot.addChat(chatId) to subscribe on messages for specific chat',
                );
            }

            return chat.eventEmitter.on(eventName, listener);
        }
    }

    emit<Event extends UrbanSyntheticEvent<BotType> = UrbanSyntheticEvent<BotType>>(
        eventName: Event['type'] | 'any',
        event: Event,
        chatId?: string,
    ) {
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

    removeListener<Event extends UrbanSyntheticEvent<BotType> = UrbanSyntheticEvent<BotType>>(
        eventName: Event['type'] | 'any',
        listener: UrbanListener<Event>,
        chatId?: string,
    ) {
        if (chatId === undefined) {
            return this.eventEmitter.removeListener(eventName, listener);
        } else {
            const chat = this.chats.get(chatId);
            if (chat === undefined) {
                throw new Error('Specify chatId via managerBot.addChat(chatId) to sendMessage for specific chat');
            }

            return chat.eventEmitter.removeListener(eventName, listener);
        }
    }

    sendMessage(message: UrbanMessage, callback?: (meta: Promise<ManagerBot<BotType>['sendMessage']>) => void) {
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

    executeSendMessage(message: UrbanMessage) {
        const chatById = this.chats.get(message.chat.id);

        if (chatById === undefined) {
            throw new Error('Specify chatId via managerBot.addChat(chatId) to sendMessage for specific chat');
        }

        return chatById.promiseQueue.next<BotType['MessageMeta']>(async () => {
            try {
                return await this.bot.sendMessage(message);
            } catch (e) {
                console.error(e);
            }
        });
    }

    sleep(ms: number): void {
        const sharedArray = new Int32Array(new SharedArrayBuffer(4));
        Atomics.wait(sharedArray, 0, 0, ms);
    }

    async updateMessage(message: UrbanExistingMessage<BotType>) {
        this.messageUpdateQueue.push(message);
    }

    async executeUpdateMessage(message: UrbanExistingMessage<BotType>) {
        if (this.bot.updateMessage === undefined) {
            console.error(
                `'${this.bot.type}' doesn't support updating message. Provide isNewMessageEveryRender prop to Root component`,
            );

            return;
        }

        try {
            return await this.bot.updateMessage(message);
        } catch (e) {
            console.error(e);
        }
    }

    async deleteMessage(message: UrbanExistingMessage<BotType>) {
        this.sleep(200);
        if (this.bot.deleteMessage === undefined) {
            console.error(
                `'${this.bot.type}' doesn't support deleting message. Provide isNewMessageEveryRender prop to Root component`,
            );

            return;
        }

        try {
            return await this.bot.deleteMessage(message);
        } catch (e) {
            console.error(e);
        }
    }
}
