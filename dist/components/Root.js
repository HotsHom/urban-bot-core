"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const context_1 = require("../context");
const ErrorBoundary_1 = require("./ErrorBoundary");
const ManagerBot_1 = require("../ManagerBot/ManagerBot");
const expressApp_1 = require("../expressApp");
function Chat({ bot, children, isNewMessageEveryRender, chat, parseMode, $$managerBot, }) {
    const BotContext = (0, context_1.getBotContext)();
    return ((0, jsx_runtime_1.jsx)(BotContext.Provider, Object.assign({ value: { bot, isNewMessageEveryRender, chat, parseMode, $$managerBot } }, { children: (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, { children: children }, void 0) }), void 0));
}
function Root({ children, bot, sessionTimeSeconds = 60 * 60 * 24 * 7, isNewMessageEveryRender = true, parseMode, port = 8080, expressApp, initialChats = [], onAnyEvent, }) {
    // TODO get chats from $$managerBot?
    const [chats, setChats] = react_1.default.useState(new Map());
    const chatsRef = react_1.default.useRef(chats);
    chatsRef.current = chats;
    const timeoutIdsRef = react_1.default.useRef({});
    const [firstMessage, setFirstMessage] = react_1.default.useState();
    react_1.default.useEffect(() => {
        if (bot.initializeServer !== undefined) {
            const { app } = (0, expressApp_1.getExpressApp)(port, expressApp);
            bot.initializeServer(app);
            (0, expressApp_1.listen)(port);
        }
    }, [port, bot, expressApp]);
    const $$managerBot = react_1.default.useMemo(() => new ManagerBot_1.ManagerBot(bot), [bot]);
    const registerChat = (0, react_1.useCallback)((chat) => {
        chatsRef.current.set(chat.id, (0, jsx_runtime_1.jsx)(Chat, Object.assign({ bot: bot, "$$managerBot": $$managerBot, isNewMessageEveryRender: isNewMessageEveryRender, chat: chat, parseMode: parseMode }, { children: children }), chat.id));
        $$managerBot.addChat(chat.id);
        setChats(new Map(chatsRef.current));
    }, [$$managerBot, bot, children, isNewMessageEveryRender, parseMode]);
    (0, react_1.useEffect)(() => {
        initialChats.forEach((chat) => {
            if (!chatsRef.current.has(chat.id)) {
                registerChat(chat);
            }
        });
    }, [initialChats, registerChat]);
    react_1.default.useEffect(() => {
        function handler(message) {
            const { chat } = message;
            const { id: chatId } = chat;
            if (!chatsRef.current.has(chatId)) {
                registerChat(chat);
                setFirstMessage(message);
            }
            if (sessionTimeSeconds && sessionTimeSeconds !== Infinity) {
                clearTimeout(timeoutIdsRef.current[chatId]);
                timeoutIdsRef.current[chatId] = setTimeout(() => {
                    chatsRef.current.delete(chatId);
                    $$managerBot.deleteChat(chatId);
                    setChats(new Map(chatsRef.current));
                }, sessionTimeSeconds * 1000);
            }
            onAnyEvent === null || onAnyEvent === void 0 ? void 0 : onAnyEvent(message);
        }
        $$managerBot.on('any', handler);
        return () => {
            $$managerBot.removeListener('any', handler);
        };
    }, [$$managerBot, registerChat, sessionTimeSeconds]);
    react_1.default.useEffect(() => {
        if (firstMessage !== undefined) {
            // First message is needed to register chat and initialize react children for it.
            // After initializing we repeat this message that react children can process it.
            $$managerBot.emit(firstMessage.type, firstMessage);
        }
    }, [firstMessage, $$managerBot]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Array.from(chats).map(([id, children]) => {
            return (0, jsx_runtime_1.jsx)("chat", { children: children }, id);
        }) }, void 0));
}
exports.Root = Root;
//# sourceMappingURL=Root.js.map