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
exports.DialogStep = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const matchPattern_1 = require("../../utils/matchPattern");
const Text_1 = require("../Text");
const __1 = require("../..");
function DialogStep({ children, content, id, onNext, validation, type }) {
    const [checkboxes, setCheckboxes] = (0, react_1.useState)(new Set());
    const [isAnswered, setIsAnswered] = (0, react_1.useState)(false);
    const childrenArray = react_1.default.Children.toArray(children);
    const [displayedContent, setDisplayedContent] = (0, react_1.useState)(content);
    const { onFinish, finishedContent, addAnswer } = (0, __1.useDialog)();
    (0, react_1.useEffect)(() => {
        if (childrenArray.length === 0 && isAnswered && typeof children !== 'function') {
            // TODO call onFinish not inside useEffects
            onFinish();
            setDisplayedContent(finishedContent);
        }
    }, [childrenArray.length, isAnswered, finishedContent, onFinish, children]);
    async function handler(text) {
        if (isAnswered) {
            return;
        }
        const matchedChild = childrenArray.find((child) => child.props.match === undefined || (0, matchPattern_1.matchPattern)(text, child.props.match));
        if (validation !== undefined) {
            const validationError = await validation(text);
            if (validationError) {
                setDisplayedContent((0, jsx_runtime_1.jsx)(Text_1.Text, Object.assign({ isNewMessageEveryRender: true }, { children: validationError }), void 0));
                return;
            }
        }
        if (childrenArray.length === 0 || matchedChild !== undefined || typeof children === 'function') {
            if (id !== undefined) {
                addAnswer(id, text);
            }
            setIsAnswered(true);
            onNext === null || onNext === void 0 ? void 0 : onNext(text);
        }
        if (typeof children === 'function') {
            setDisplayedContent(await children(text));
            return;
        }
        if (matchedChild !== undefined) {
            setDisplayedContent(matchedChild);
        }
    }
    (0, __1.useText)(({ text }) => handler(text));
    (0, __1.useAction)(({ actionId }) => {
        if (type !== 'checkbox') {
            handler(actionId);
            return;
        }
        if (actionId === 'checkbox-next') {
            handler(String(Array.from(checkboxes)));
        }
        else {
            setCheckboxes((prevCheckboxes) => {
                const newCheckboxes = new Set(prevCheckboxes);
                if (newCheckboxes.has(actionId)) {
                    newCheckboxes.delete(actionId);
                }
                else {
                    newCheckboxes.add(actionId);
                }
                return newCheckboxes;
            });
        }
    });
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: displayedContent }, void 0);
}
exports.DialogStep = DialogStep;
//# sourceMappingURL=DialogStep.js.map