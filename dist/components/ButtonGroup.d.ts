import React from 'react';
import { ButtonElement } from '../utils/formatButtonElement';
import { UrbanButtonStyle, UrbanMessageCommonData } from '../types/Messages';
import { OtherProps } from '../types/common';
export declare type ButtonGroupProps = UrbanMessageCommonData & {
    title?: React.ReactNode;
    isReplyButtons?: boolean;
    isResizedKeyboard?: boolean;
    isNewMessageEveryRender?: boolean;
    maxColumns?: number;
    children: ButtonElement | ButtonElement[] | ButtonElement[][];
};
export declare function ButtonGroup({ children, title, isNewMessageEveryRender: isNewMessageEveryRenderProp, parseMode, disableNotification, replyToMessageId, forceReply, maxColumns, isReplyButtons, ...otherProps }: ButtonGroupProps): JSX.Element;
export declare type ButtonProps = OtherProps & {
    onClick?: (...args: unknown[]) => unknown;
    children: string;
    id?: string;
    url?: string;
    webApp?: {
        url: string;
    };
    phoneNumber?: string | number;
    style?: UrbanButtonStyle;
    isDisabled?: boolean;
};
export declare function Button(_props: ButtonProps): null;
