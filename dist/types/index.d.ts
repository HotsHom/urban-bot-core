/// <reference types="node" />
import { OtherProps } from './common';
export declare type UrbanChat = {
    id: string;
    type?: string;
    title?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    description?: string;
    inviteLink?: string;
};
export declare type UrbanFrom = {
    id?: string;
    isBot?: boolean;
    username?: string;
    firstName?: string;
    lastName?: string;
    avatars?: string[];
};
export declare type UrbanFile = OtherProps & {
    id?: string;
    url?: string;
    name?: string;
    size?: number;
    width?: number;
    height?: number;
    mimeType?: string;
    type?: string;
    duration?: number;
};
export declare type UrbanFileFormat = string | Buffer | NodeJS.ReadableStream;
export declare type UrbanParseMode = 'HTML' | 'markdown';
export declare type UrbanListener<Event> = (event: Event) => unknown;
export declare type UrbanCommand = {
    command: string;
    description?: string;
};
export * from './common';
export * from './Events';
export * from './Messages';
export * from './UrbanBot';
