import React from 'react';
import { UrbanMessageCommonData } from '../types/Messages';
import { ButtonGroupProps } from './ButtonGroup';
export declare type ContactProps = UrbanMessageCommonData & {
    phoneNumber?: string | number;
    username?: string;
    firstName?: string;
    lastName?: string;
    vCard?: string;
    isNewMessageEveryRender?: boolean;
    buttons?: React.FunctionComponentElement<ButtonGroupProps>;
};
export declare function Contact({ phoneNumber, username, firstName, lastName, vCard, buttons: buttonGroupElement, isNewMessageEveryRender: isNewMessageEveryRenderProp, disableNotification, forceReply, replyToMessageId, ...otherProps }: ContactProps): JSX.Element;
