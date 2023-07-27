"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParams = exports.matchChild = exports.matchPattern = void 0;
const path_parser_1 = require("path-parser");
// TODO get from common utils
const matchPattern = (path, pattern, commandPrefix) => {
    if (!pattern) {
        return true;
    }
    if (pattern instanceof RegExp) {
        return pattern.test(path);
    }
    if (pattern.includes(' ') || !pattern.startsWith(commandPrefix)) {
        return pattern === path;
    }
    const pathInstance = new path_parser_1.Path(pattern);
    return pathInstance.test(path) !== null;
};
exports.matchPattern = matchPattern;
const matchChild = (path, commandPrefix) => (child) => {
    return (0, exports.matchPattern)(path, child.props.path, commandPrefix);
};
exports.matchChild = matchChild;
function getParams(path, commandPrefix, pattern) {
    var _a;
    if (typeof pattern !== 'string') {
        return undefined;
    }
    if (pattern.includes(' ') || !pattern.startsWith(commandPrefix)) {
        return undefined;
    }
    const pathInstance = new path_parser_1.Path(pattern);
    return (_a = pathInstance.test(path)) !== null && _a !== void 0 ? _a : undefined;
}
exports.getParams = getParams;
//# sourceMappingURL=utils.js.map