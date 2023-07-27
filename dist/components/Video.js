"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hooks_1 = require("../hooks/hooks");
const getButtonsByButtonGroup_1 = require("../utils/getButtonsByButtonGroup");
const formatMarkupLanguageElement_1 = require("../utils/formatMarkupLanguageElement");
const getParseMode_1 = require("../utils/getParseMode");
function Video({ file, name, author, height, width, buttons: buttonGroupElement, disableNotification, duration, forceReply, isNewMessageEveryRender: isNewMessageEveryRenderProp, parseMode, replyToMessageId, title, ...otherProps }) {
    const { $$managerBot, isNewMessageEveryRender: isNewMessageEveryRenderContext, chat, parseMode: parseModeContext, bot, } = (0, hooks_1.useBotContext)();
    const finalParseMode = (0, getParseMode_1.getParseMode)(title, parseMode, parseModeContext, bot.defaultParseMode);
    const formattedTitle = (0, formatMarkupLanguageElement_1.formatMarkupLanguageElement)(title, finalParseMode);
    const formattedButtons = (0, getButtonsByButtonGroup_1.getButtonsByButtonGroup)(buttonGroupElement);
    return ((0, jsx_runtime_1.jsx)("urban-video", { "$$managerBot": $$managerBot, chat: chat, isNewMessageEveryRender: isNewMessageEveryRenderProp !== null && isNewMessageEveryRenderProp !== void 0 ? isNewMessageEveryRenderProp : isNewMessageEveryRenderContext, data: {
            disableNotification,
            replyToMessageId,
            forceReply,
            parseMode: finalParseMode,
            buttons: formattedButtons,
            isReplyButtons: buttonGroupElement === null || buttonGroupElement === void 0 ? void 0 : buttonGroupElement.props.isReplyButtons,
            title: formattedTitle,
            file,
            name,
            duration,
            author,
            height,
            width,
            ...otherProps,
        } }, void 0));
}
exports.Video = Video;
//# sourceMappingURL=Video.js.map