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
exports.Dialog = exports.useDialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const DialogContext = react_1.default.createContext({});
function useDialog() {
    return (0, react_1.useContext)(DialogContext);
}
exports.useDialog = useDialog;
function Dialog({ children, onFinish, finishedContent }) {
    const [answers, setAnswers] = (0, react_1.useState)({});
    const onFinishCallback = (0, react_1.useCallback)(() => {
        onFinish === null || onFinish === void 0 ? void 0 : onFinish(answers);
    }, [answers, onFinish]);
    const addAnswer = (id, answer) => {
        setAnswers({ ...answers, [id]: answer });
    };
    return ((0, jsx_runtime_1.jsx)(DialogContext.Provider, Object.assign({ value: { onFinish: onFinishCallback, finishedContent, addAnswer } }, { children: children }), void 0));
}
exports.Dialog = Dialog;
//# sourceMappingURL=Dialog.js.map