import React from 'react';
import { ButtonProps } from '../components/ButtonGroup';
import { OtherProps } from '../types/common';
export declare type FormattedButton = OtherProps & {
    id: string;
    text: string;
    onClick?: (...args: unknown[]) => unknown;
};
export declare type ButtonElement = React.ReactElement<ButtonProps> | boolean | null | undefined;
export declare function formatButtonElement(element: ButtonElement | ButtonElement[] | ButtonElement[][]): FormattedButton[] | FormattedButton[][];
