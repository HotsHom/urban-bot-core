import React from 'react';
export declare type RouteProps = {
    path: string | RegExp;
    description?: string;
    children: React.ReactNode;
};
export declare function Route(props: RouteProps): import("react/jsx-runtime").JSX.Element;
