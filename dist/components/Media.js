"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hooks_1 = require("../hooks/hooks");
function Media({ files, isNewMessageEveryRender: isNewMessageEveryRenderProp, disableNotification, forceReply, parseMode, replyToMessageId, ...otherProps }) {
    const { $$managerBot, isNewMessageEveryRender: isNewMessageEveryRenderContext, chat } = (0, hooks_1.useBotContext)();
    // TODO add format files title
    return ((0, jsx_runtime_1.jsx)("urban-media", { "$$managerBot": $$managerBot, chat: chat, isNewMessageEveryRender: isNewMessageEveryRenderProp !== null && isNewMessageEveryRenderProp !== void 0 ? isNewMessageEveryRenderProp : isNewMessageEveryRenderContext, data: {
            files,
            disableNotification,
            replyToMessageId,
            forceReply,
            parseMode,
            ...otherProps,
        } }, void 0));
}
exports.Media = Media;
//# sourceMappingURL=Media.js.map