import React from 'react';
export declare type DialogValidationResult = string | void | Promise<string | void>;
export declare type DialogValidation = (answer: string) => DialogValidationResult;
export declare type DialogStepProps = {
    children?: ((answer: string) => React.ReactNode) | React.ReactNode;
    match?: string | RegExp;
    content: React.ReactNode;
    id?: string;
    onNext?: (answer: string) => void;
    validation?: DialogValidation;
    type?: 'checkbox';
};
export declare function DialogStep({ children, content, id, onNext, validation, type }: DialogStepProps): import("react/jsx-runtime").JSX.Element;
