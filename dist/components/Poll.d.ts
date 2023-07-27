import React from 'react';
import { UrbanMessageCommonData } from '../types/Messages';
import { ButtonGroupProps } from './ButtonGroup';
import { OtherProps } from '../types/common';
export declare type PollProps = UrbanMessageCommonData & {
    question: string;
    children: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
    buttons?: React.FunctionComponentElement<ButtonGroupProps>;
    isNewMessageEveryRender?: boolean;
    isAnonymous?: boolean;
    type?: string;
    withMultipleAnswers?: boolean;
    rightOption?: string | number;
    explanation?: React.ReactChild;
    livePeriodSeconds?: number;
};
export declare function Poll({ buttons: buttonGroupElement, isNewMessageEveryRender: isNewMessageEveryRenderProp, question, children, isAnonymous, type, withMultipleAnswers, rightOption, explanation, livePeriodSeconds, disableNotification, forceReply, parseMode, replyToMessageId, ...otherProps }: PollProps): JSX.Element;
export declare type OptionProps = OtherProps & {
    children: string;
    onClick?: (...args: unknown[]) => unknown;
    id?: string;
};
export declare function Option(_props: OptionProps): null;
