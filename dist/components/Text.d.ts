import React from 'react';
import { UrbanMessageCommonData } from '../types/Messages';
export declare type TextProps = UrbanMessageCommonData & {
    disableWebPagePreview?: boolean;
    children: React.ReactNode;
    isNewMessageEveryRender?: boolean;
};
export declare function Text({ children, isNewMessageEveryRender: isNewMessageEveryRenderProp, parseMode, disableWebPagePreview, disableNotification, replyToMessageId, forceReply, ...otherProps }: TextProps): JSX.Element;
