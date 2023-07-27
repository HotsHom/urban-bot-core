import React from 'react';
import { UrbanMessageCommonData } from '../types/Messages';
import { ButtonGroupProps } from './ButtonGroup';
import { UrbanFileFormat } from '../types';
export declare type AudioProps = UrbanMessageCommonData & {
    file: UrbanFileFormat;
    name?: string;
    title?: React.ReactNode;
    isNewMessageEveryRender?: boolean;
    duration?: number;
    author?: string;
    buttons?: React.FunctionComponentElement<ButtonGroupProps>;
};
export declare function Audio({ file, name, author, title, duration, buttons: buttonGroupElement, isNewMessageEveryRender: isNewMessageEveryRenderProp, disableNotification, forceReply, parseMode, replyToMessageId, ...otherProps }: AudioProps): JSX.Element;
