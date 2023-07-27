import express from 'express';
export declare type ExpressAppType = {
    app: express.Express;
    isStarted: boolean;
};
export declare function getExpressApp(port: number, expressApp?: import("express-serve-static-core").Express): ExpressAppType;
export declare function listen(port: number): void;
