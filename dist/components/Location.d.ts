import React from 'react';
import { UrbanMessageCommonData } from '../types/Messages';
import { ButtonGroupProps } from './ButtonGroup';
export declare type LocationProps = UrbanMessageCommonData & {
    latitude: number;
    longitude: number;
    livePeriodSeconds?: number;
    title?: React.ReactNode;
    buttons?: React.FunctionComponentElement<ButtonGroupProps>;
    isNewMessageEveryRender?: boolean;
};
export declare function Location({ latitude, longitude, livePeriodSeconds, title, buttons: buttonGroupElement, isNewMessageEveryRender: isNewMessageEveryRenderProp, disableNotification, forceReply, parseMode, replyToMessageId, ...otherProps }: LocationProps): JSX.Element;
