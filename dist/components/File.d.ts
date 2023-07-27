import React from 'react';
import { UrbanMessageCommonData } from '../types/Messages';
import { ButtonGroupProps } from './ButtonGroup';
import { UrbanFileFormat } from '../types';
export declare type FileProps = UrbanMessageCommonData & {
    file: UrbanFileFormat;
    title?: React.ReactNode;
    buttons?: React.FunctionComponentElement<ButtonGroupProps>;
    isNewMessageEveryRender?: boolean;
    name?: string;
};
export declare function File({ file, title, name, buttons: buttonGroupElement, isNewMessageEveryRender: isNewMessageEveryRenderProp, disableNotification, forceReply, parseMode, replyToMessageId, ...otherProps }: FileProps): JSX.Element;
