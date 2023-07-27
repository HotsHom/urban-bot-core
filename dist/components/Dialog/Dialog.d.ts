import React from 'react';
export declare type DialogProps = {
    children?: React.ReactNode;
    onFinish?: (answers: DialogAnswers) => void;
    finishedContent?: React.ReactNode;
};
export declare type DialogAnswers = {
    [id: string]: string;
};
export declare type DialogAddAnswer = (id: string, answer: string) => void;
export declare type DialogContextType = {
    onFinish: () => void;
    finishedContent?: React.ReactNode;
    addAnswer: DialogAddAnswer;
};
export declare function useDialog(): DialogContextType;
export declare function Dialog({ children, onFinish, finishedContent }: DialogProps): JSX.Element;
