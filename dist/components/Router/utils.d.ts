import React from 'react';
import { RouteProps } from './Route';
export declare const matchPattern: (path: string, pattern: string | RegExp, commandPrefix: string) => boolean;
export declare const matchChild: (path: string, commandPrefix: string) => (child: React.ReactElement<RouteProps>) => boolean;
export declare function getParams(path: string, commandPrefix: string, pattern?: string | RegExp): Record<string, any> | undefined;
