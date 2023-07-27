"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAction = exports.useDice = exports.useVideoNote = exports.useVoice = exports.useVideo = exports.usePoll = exports.useImage = exports.useLocation = exports.useInvoice = exports.useFile = exports.useContact = exports.useAudio = exports.useAnimation = exports.useSticker = exports.useAnyEvent = exports.useSubscribeWithSpreadPayload = exports.useRouter = exports.useBotContext = void 0;
const react_1 = __importDefault(require("react"));
const context_1 = require("../context");
function useBotContext() {
    const BotContext = (0, context_1.getBotContext)();
    const botContext = react_1.default.useContext(BotContext);
    if (botContext === undefined) {
        throw new Error('You should use useBotContext only under Root component');
    }
    return botContext;
}
exports.useBotContext = useBotContext;
function useRouter() {
    const routerContext = react_1.default.useContext(context_1.RouterContext);
    if (routerContext === undefined) {
        throw new Error('You should use useBotContext only under Router component');
    }
    return routerContext;
}
exports.useRouter = useRouter;
function useSubscribe(listener, event) {
    const { chat, $$managerBot } = useBotContext();
    react_1.default.useEffect(() => {
        $$managerBot.on(event, listener, chat.id);
        return () => {
            $$managerBot.removeListener(event, listener, chat.id);
        };
    }, [listener, $$managerBot, event, chat]);
}
function useSubscribeWithSpreadPayload(listener, eventType) {
    useSubscribe((event) => {
        const { payload, ...other } = event;
        listener({
            ...other,
            ...payload,
        });
    }, eventType);
}
exports.useSubscribeWithSpreadPayload = useSubscribeWithSpreadPayload;
function useAnyEvent(listener) {
    useSubscribeWithSpreadPayload(listener, 'any');
}
exports.useAnyEvent = useAnyEvent;
function useSticker(listener) {
    useSubscribeWithSpreadPayload(listener, 'sticker');
}
exports.useSticker = useSticker;
function useAnimation(listener) {
    useSubscribeWithSpreadPayload(listener, 'animation');
}
exports.useAnimation = useAnimation;
function useAudio(listener) {
    useSubscribeWithSpreadPayload(listener, 'audio');
}
exports.useAudio = useAudio;
function useContact(listener) {
    useSubscribeWithSpreadPayload(listener, 'contact');
}
exports.useContact = useContact;
function useFile(listener) {
    useSubscribeWithSpreadPayload(listener, 'file');
}
exports.useFile = useFile;
function useInvoice(listener) {
    useSubscribeWithSpreadPayload(listener, 'invoice');
}
exports.useInvoice = useInvoice;
function useLocation(listener) {
    useSubscribeWithSpreadPayload(listener, 'location');
}
exports.useLocation = useLocation;
function useImage(listener) {
    useSubscribeWithSpreadPayload(listener, 'image');
}
exports.useImage = useImage;
function usePoll(listener) {
    useSubscribeWithSpreadPayload(listener, 'poll');
}
exports.usePoll = usePoll;
function useVideo(listener) {
    useSubscribeWithSpreadPayload(listener, 'video');
}
exports.useVideo = useVideo;
function useVoice(listener) {
    useSubscribeWithSpreadPayload(listener, 'voice');
}
exports.useVoice = useVoice;
function useVideoNote(listener) {
    useSubscribeWithSpreadPayload(listener, 'video_note');
}
exports.useVideoNote = useVideoNote;
function useDice(listener) {
    useSubscribeWithSpreadPayload(listener, 'dice');
}
exports.useDice = useDice;
function useAction(listener) {
    useSubscribeWithSpreadPayload(listener, 'action');
}
exports.useAction = useAction;
//# sourceMappingURL=hooks.js.map