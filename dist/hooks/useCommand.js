"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCommand = void 0;
const hooks_1 = require("./hooks");
const matchPattern_1 = require("../utils/matchPattern");
function useCommand(listener, pattern) {
    const listenerGuard = (event) => {
        if (pattern !== undefined) {
            const isTextMatchPattern = (0, matchPattern_1.matchPattern)(event.command, pattern);
            if (!isTextMatchPattern) {
                return;
            }
        }
        listener(event);
    };
    (0, hooks_1.useSubscribeWithSpreadPayload)(listenerGuard, 'command');
}
exports.useCommand = useCommand;
//# sourceMappingURL=useCommand.js.map