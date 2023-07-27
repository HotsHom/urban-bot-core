import React from 'react';
import { OtherProps } from '../types/common';
import { OptionProps } from '../components/Poll';
declare type FormattedOption = OtherProps & {
    text: string;
    onClick?: (...args: unknown[]) => unknown;
    id: string;
};
export declare function formatOptionElement(element: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[]): FormattedOption[];
export {};
