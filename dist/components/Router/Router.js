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
exports.Router = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = __importStar(require("react"));
const hooks_1 = require("../../hooks/hooks");
const useText_1 = require("../../hooks/useText");
const useCommand_1 = require("../../hooks/useCommand");
const context_1 = require("../../context");
const utils_1 = require("./utils");
let isCommandsInitialized = false;
function Router({ children, withInitializeCommands = false, historyLength = 5, helperComponent }) {
    const { bot } = (0, hooks_1.useBotContext)();
    const history = (0, react_2.useRef)([]);
    const [activeOptions, setActiveOptions] = react_2.default.useState(() => ({
        path: { value: '', key: Math.random() },
        query: {},
    }));
    const childrenArray = react_2.default.Children.toArray(children);
    const navigate = (0, react_2.useCallback)((path, query = {}) => {
        const newHistory = [...history.current, path];
        history.current = newHistory.length <= historyLength ? newHistory : newHistory.slice(1);
        setActiveOptions({ path: { value: path, key: Math.random() }, query });
    }, [historyLength]);
    react_2.default.useEffect(() => {
        var _a;
        if (!withInitializeCommands || isCommandsInitialized) {
            return;
        }
        const commands = childrenArray
            .map((routes) => {
            return {
                command: routes.props.path,
                description: routes.props.description,
            };
        })
            .filter(({ command, description }) => typeof command === 'string' && command[0] === bot.commandPrefix && Boolean(description));
        (_a = bot.initializeCommands) === null || _a === void 0 ? void 0 : _a.call(bot, commands).then(() => {
            isCommandsInitialized = true;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    react_2.default.useEffect(() => {
        if (childrenArray.some((0, utils_1.matchChild)(bot.commandPrefix, bot.commandPrefix))) {
            navigate(bot.commandPrefix);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // TODO check router children rerendering
    (0, useCommand_1.useCommand)(({ command }) => {
        if (childrenArray.some((0, utils_1.matchChild)(command, bot.commandPrefix))) {
            navigate(command);
        }
    });
    (0, useText_1.useText)(({ text }) => {
        if (childrenArray.some((0, utils_1.matchChild)(text, bot.commandPrefix))) {
            navigate(text);
        }
    });
    const component = childrenArray.find((0, utils_1.matchChild)(activeOptions.path.value, bot.commandPrefix));
    const params = (0, utils_1.getParams)(activeOptions.path.value, bot.commandPrefix, component === null || component === void 0 ? void 0 : component.props.path);
    return ((0, jsx_runtime_1.jsxs)(context_1.RouterContext.Provider, Object.assign({ value: {
            activePath: activeOptions.path.value,
            navigate,
            params,
            history: history.current,
            query: activeOptions.query,
        } }, { children: [helperComponent && helperComponent, component ? (0, react_1.createElement)(component.type, { ...component.props, key: activeOptions.path.key }) : null] }), void 0));
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map