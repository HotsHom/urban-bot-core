"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterval = void 0;
const react_1 = __importDefault(require("react"));
function useInterval(callback, interval = 0) {
    const savedCallback = react_1.default.useRef();
    react_1.default.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    react_1.default.useEffect(() => {
        const id = setInterval(() => {
            var _a;
            (_a = savedCallback.current) === null || _a === void 0 ? void 0 : _a.call(savedCallback);
        }, interval);
        return () => clearInterval(id);
    }, [interval]);
}
exports.useInterval = useInterval;
//# sourceMappingURL=useInterval.js.map