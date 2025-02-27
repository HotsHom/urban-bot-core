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

export class ManagerBot<BotType extends UrbanBotType = UrbanBotType> {
    private chats = new Map<string, Chat>();
    private eventEmitter: EventEmitter;
    private currentMessageCount = 0;

    constructor(private bot: UrbanBot<BotType>) {
        this.eventEmitter = new EventEmitter();

        bot.processUpdate = this.processUpdate;
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

    sendMessage(message: UrbanMessage): Promise<BotType['MessageMeta']> {
        this.currentMessageCount++;
        this.sleep(this.currentMessageCount > 20 ? 1000 : 200);
        const chatById = this.chats.get(message.chat.id);

        if (chatById === undefined) {
            throw new Error('Specify chatId via managerBot.addChat(chatId) to sendMessage for specific chat');
        }

        return chatById.promiseQueue.next<BotType['MessageMeta']>(async () => {
            try {
                const meta = await this.bot.sendMessage(message);
                this.currentMessageCount--;

                return meta;
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
        this.sleep(200);
        if (this.bot.updateMessage === undefined) {
            console.warn(
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
