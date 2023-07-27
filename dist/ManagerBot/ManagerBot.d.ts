/// <reference types="node" />
import { EventEmitter } from 'events';
import { ProcessUpdate, UrbanBot, UrbanBotType } from '../types/UrbanBot';
import { UrbanExistingMessage, UrbanMessage } from '../types/Messages';
import { UrbanListener } from '../types';
import { UrbanSyntheticEvent } from '../types/Events';
export declare class ManagerBot<BotType extends UrbanBotType = UrbanBotType> {
    private bot;
    private chats;
    private eventEmitter;
    constructor(bot: UrbanBot<BotType>);
    processUpdate: ProcessUpdate<BotType>;
    addChat(id: string): void;
    deleteChat(id: string): void;
    on<Event extends UrbanSyntheticEvent<BotType> = UrbanSyntheticEvent<BotType>>(eventName: Event['type'] | 'any', listener: UrbanListener<Event>, chatId?: string): EventEmitter;
    emit<Event extends UrbanSyntheticEvent<BotType> = UrbanSyntheticEvent<BotType>>(eventName: Event['type'] | 'any', event: Event, chatId?: string): void;
    removeListener<Event extends UrbanSyntheticEvent<BotType> = UrbanSyntheticEvent<BotType>>(eventName: Event['type'] | 'any', listener: UrbanListener<Event>, chatId?: string): EventEmitter;
    sendMessage(message: UrbanMessage): Promise<BotType['MessageMeta']>;
    updateMessage(message: UrbanExistingMessage<BotType>): Promise<any>;
    deleteMessage(message: UrbanExistingMessage<BotType>): Promise<any>;
}
