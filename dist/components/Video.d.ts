import React from 'react';
import { UrbanMessageCommonData } from '../types/Messages';
import { ButtonGroupProps } from './ButtonGroup';
import { UrbanFileFormat } from '../types';
export declare type VideoProps = UrbanMessageCommonData & {
    file: UrbanFileFormat;
    name?: string;
    title?: React.ReactNode;
    duration?: number;
    author?: string;
    width?: number;
    height?: number;
    buttons?: React.FunctionComponentElement<ButtonGroupProps>;
    isNewMessageEveryRender?: boolean;
};
export declare function Video({ file, name, author, height, width, buttons: buttonGroupElement, disableNotification, duration, forceReply, isNewMessageEveryRender: isNewMessageEveryRenderProp, parseMode, replyToMessageId, title, ...otherProps }: VideoProps): JSX.Element;
