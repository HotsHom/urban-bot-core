import React from 'react';
declare type RouterProps = {
    children: React.ReactNode;
    withInitializeCommands?: boolean;
    historyLength?: number;
    helperComponent?: React.ReactNode;
};
export declare function Router({ children, withInitializeCommands, historyLength, helperComponent }: RouterProps): JSX.Element;
export {};
