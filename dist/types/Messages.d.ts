import { UrbanBotType, UrbanChat, UrbanFileFormat, UrbanParseMode } from './index';
import { OtherProps } from './common';
export declare type UrbanButtonStyle = 'PRIMARY' | 'SECONDARY' | 'SUCCESS' | 'DANGER' | 'LINK';
export declare type UrbanButton = OtherProps & {
    text: string;
    id?: string;
    url?: string;
    phoneNumber?: string | number;
    webApp?: {
        url: string;
    };
    style?: UrbanButtonStyle;
    isDisabled?: boolean;
};
export declare type UrbanOption = {
    text: string;
    id?: string;
};
export declare type UrbanMessageCommon = {
    chat: UrbanChat;
};
export declare type UrbanMessageCommonData = OtherProps & {
    parseMode?: UrbanParseMode;
    disableNotification?: boolean;
    replyToMessageId?: string | number;
    forceReply?: boolean;
    personaId?: string | number;
    simulateTyping?: number;
    isRemoveKeyboard?: boolean;
    onSent?: (data: any) => any;
};
export declare type UrbanMessageTextData = UrbanMessageCommonData & {
    text: string;
    disableWebPagePreview?: boolean;
};
export declare type UrbanMessageText = UrbanMessageCommon & {
    nodeName: 'urban-text';
    data: UrbanMessageTextData;
};
export declare type UrbanMessageImageData = UrbanMessageCommonData & {
    title?: string;
    file: UrbanFileFormat;
    name?: string;
    buttons?: UrbanButton[] | UrbanButton[][];
    isReplyButtons?: boolean;
    alt?: string;
};
export declare type UrbanMessageImage = UrbanMessageCommon & {
    nodeName: 'urban-img';
    data: UrbanMessageImageData;
};
export declare type UrbanMessageButtonsData = UrbanMessageCommonData & {
    title: string;
    buttons: UrbanButton[] | UrbanButton[][];
    isReplyButtons: boolean;
    isResizedKeyboard?: boolean;
};
export declare type UrbanMessageButtons = UrbanMessageCommon & {
    nodeName: 'urban-buttons';
    data: UrbanMessageButtonsData;
};
export declare type UrbanMessageAudioData = UrbanMessageCommonData & {
    title?: string;
    file: UrbanFileFormat;
    name?: string;
    buttons?: UrbanButton[] | UrbanButton[][];
    isReplyButtons?: boolean;
    duration?: number;
    author?: string;
};
export declare type UrbanMessageAudio = UrbanMessageCommon & {
    nodeName: 'urban-audio';
    data: UrbanMessageAudioData;
};
export declare type UrbanMessageVideoData = UrbanMessageCommonData & {
    title?: string;
    file: UrbanFileFormat;
    name?: string;
    buttons?: UrbanButton[] | UrbanButton[][];
    isReplyButtons?: boolean;
    duration?: number;
    width?: number;
    height?: number;
    author?: string;
};
export declare type UrbanMessageVideo = UrbanMessageCommon & {
    nodeName: 'urban-video';
    data: UrbanMessageVideoData;
};
export declare type UrbanMessageAnimationData = UrbanMessageCommonData & {
    title?: string;
    file: UrbanFileFormat;
    name?: string;
    buttons?: UrbanButton[] | UrbanButton[][];
    isReplyButtons?: boolean;
    duration?: number;
    width?: number;
    height?: number;
};
export declare type UrbanMessageAnimation = UrbanMessageCommon & {
    nodeName: 'urban-animation';
    data: UrbanMessageAnimationData;
};
export declare type UrbanMessageFileData = UrbanMessageCommonData & {
    title?: string;
    file: UrbanFileFormat;
    buttons?: UrbanButton[] | UrbanButton[][];
    isReplyButtons?: boolean;
    name?: string;
};
export declare type UrbanMessageFile = UrbanMessageCommon & {
    nodeName: 'urban-file';
    data: UrbanMessageFileData;
};
export declare type UrbanMessagePollData = UrbanMessageCommonData & {
    question: string;
    options: UrbanOption[];
    isAnonymous?: boolean;
    type?: string;
    withMultipleAnswers?: boolean;
    rightOption?: string | number;
    explanation?: string;
    parseMode?: UrbanParseMode;
    livePeriodSeconds?: number;
    buttons?: UrbanButton[] | UrbanButton[][];
    isReplyButtons?: boolean;
};
export declare type UrbanMessagePoll = UrbanMessageCommon & {
    nodeName: 'urban-poll';
    data: UrbanMessagePollData;
};
export declare type UrbanMessageContactData = UrbanMessageCommonData & {
    phoneNumber?: string | number;
    firstName?: string;
    lastName?: string;
    vCard?: string;
    username?: string;
    buttons?: UrbanButton[] | UrbanButton[][];
    isReplyButtons?: boolean;
};
export declare type UrbanMessageContact = UrbanMessageCommon & {
    nodeName: 'urban-contact';
    data: UrbanMessageContactData;
};
export declare type UrbanMessageMediaData = UrbanMessageCommonData & {
    title?: string;
    files: Array<(UrbanMessageImageData & {
        type: 'image';
    }) | (UrbanMessageVideoData & {
        type: 'video';
    }) | (UrbanMessageAudioData & {
        type: 'audio';
    }) | (UrbanMessageFileData & {
        type: 'file';
    })>;
    buttons?: UrbanButton[] | UrbanButton[][];
};
export declare type UrbanMessageMedia = UrbanMessageCommon & {
    nodeName: 'urban-media';
    data: UrbanMessageMediaData;
};
export declare type UrbanMessageLocationData = UrbanMessageCommonData & {
    latitude: number;
    longitude: number;
    livePeriodSeconds?: number;
    buttons?: UrbanButton[] | UrbanButton[][];
    isReplyButtons?: boolean;
    title?: string;
};
export declare type UrbanMessageLocation = UrbanMessageCommon & {
    nodeName: 'urban-location';
    data: UrbanMessageLocationData;
};
export declare type UrbanMessage = UrbanMessageText | UrbanMessageImage | UrbanMessageButtons | UrbanMessageAudio | UrbanMessageVideo | UrbanMessageFile | UrbanMessagePoll | UrbanMessageAnimation | UrbanMessageContact | UrbanMessageLocation | UrbanMessageMedia;
export declare type UrbanMessageData = UrbanMessageTextData | UrbanMessageImageData | UrbanMessageButtonsData | UrbanMessageAudioData | UrbanMessageVideoData | UrbanMessageAnimationData | UrbanMessageFileData | UrbanMessagePollData | UrbanMessageContactData | UrbanMessageLocationData | UrbanMessageMediaData;
declare type Meta<BotType extends UrbanBotType> = {
    meta: BotType['MessageMeta'];
};
export declare type UrbanExistingMessage<BotType extends UrbanBotType> = UrbanMessage & Meta<BotType>;
export declare type UrbanExistingMessageByType<BotType extends UrbanBotType, T extends UrbanMessageNodeName> = T extends 'urban-text' ? UrbanMessageText & Meta<BotType> : T extends 'urban-buttons' ? UrbanMessageButtons & Meta<BotType> : T extends 'urban-img' ? UrbanMessageImage & Meta<BotType> : T extends 'urban-audio' ? UrbanMessageAudio & Meta<BotType> : T extends 'urban-video' ? UrbanMessageVideo & Meta<BotType> : T extends 'urban-animation' ? UrbanMessageAnimation & Meta<BotType> : T extends 'urban-file' ? UrbanMessageFile & Meta<BotType> : T extends 'urban-poll' ? UrbanMessagePoll & Meta<BotType> : T extends 'urban-contact' ? UrbanMessageContact & Meta<BotType> : T extends 'urban-media' ? UrbanMessageMedia & Meta<BotType> : T extends 'urban-location' ? UrbanMessageLocation & Meta<BotType> : UrbanExistingMessage<BotType>;
export declare type UrbanMessageNodeName = UrbanMessage['nodeName'];
export {};
