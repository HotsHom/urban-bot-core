import React from 'react';
export declare class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>> {
    state: {
        hasError: boolean;
    };
    constructor(props: React.PropsWithChildren<{}>);
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
    };
    render(): React.ReactNode;
}
