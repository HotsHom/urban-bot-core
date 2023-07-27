import React from 'react';
import { UrbanMessageCommonData } from '../types/Messages';
import { ButtonGroupProps } from './ButtonGroup';
import { UrbanFileFormat } from '../types';
export declare type AnimationProps = UrbanMessageCommonData & {
    file: UrbanFileFormat;
    name?: string;
    title?: React.ReactNode;
    duration?: number;
    width?: number;
    height?: number;
    buttons?: React.FunctionComponentElement<ButtonGroupProps>;
    isNewMessageEveryRender?: boolean;
};
export declare function Animation({ file, name, height, width, buttons: buttonGroupElement, disableNotification, duration, forceReply, isNewMessageEveryRender: isNewMessageEveryRenderProp, parseMode, replyToMessageId, title, ...otherProps }: AnimationProps): JSX.Element;
