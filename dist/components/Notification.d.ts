import React from 'react';
export declare type NotificationProps = {
    children: React.ReactNode;
    intervalSeconds: number;
};
export declare function Notification({ children, intervalSeconds }: NotificationProps): JSX.Element | null;
