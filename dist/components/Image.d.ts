import React from 'react';
import { UrbanMessageCommonData } from '../types/Messages';
import { ButtonGroupProps } from './ButtonGroup';
import { UrbanFileFormat } from '../types';
export declare type ImageProps = UrbanMessageCommonData & {
    file: UrbanFileFormat;
    name?: string;
    title?: React.ReactNode;
    alt?: string;
    isNewMessageEveryRender?: boolean;
    buttons?: React.FunctionComponentElement<ButtonGroupProps>;
};
export declare function Image({ file, title, alt, name, buttons: buttonGroupElement, isNewMessageEveryRender: isNewMessageEveryRenderProp, parseMode, disableNotification, replyToMessageId, forceReply, ...otherProps }: ImageProps): JSX.Element;
