"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const useInterval_1 = require("../hooks/useInterval");
function Notification({ children, intervalSeconds }) {
    const [isActive, setIsActive] = react_1.default.useState(false);
    (0, useInterval_1.useInterval)(() => {
        setIsActive(true);
        setIsActive(false);
    }, intervalSeconds * 1000);
    if (!isActive) {
        return null;
    }
    const childrenArray = react_1.default.Children.toArray(children);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: childrenArray.map((element) => {
            return react_1.default.cloneElement(element, { ...element.props, isNewMessageEveryRender: true });
        }) }, void 0));
}
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map