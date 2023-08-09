import { UrbanMessageMediaData } from '../types/Messages';
export declare type MediaProps = UrbanMessageMediaData & {
    isNewMessageEveryRender?: boolean;
};
export declare function Media({ files, isNewMessageEveryRender: isNewMessageEveryRenderProp, disableNotification, forceReply, parseMode, replyToMessageId, ...otherProps }: MediaProps): import("react/jsx-runtime").JSX.Element;
