"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatButtonElement = void 0;
const react_1 = __importDefault(require("react"));
const getRandomId_1 = require("./getRandomId");
const ButtonGroup_1 = require("../components/ButtonGroup");
const isArrayMatrix_1 = require("./isArrayMatrix");
function formatButtonElement(element) {
    if ((0, isArrayMatrix_1.isArrayMatrix)(element)) {
        return element.map(formatButtonFlatArray);
    }
    return formatButtonFlatArray(element);
}
exports.formatButtonElement = formatButtonElement;
function formatButtonFlatArray(element) {
    return react_1.default.Children.toArray(element)
        .filter(react_1.default.isValidElement)
        .map((child) => {
        if (child.type !== ButtonGroup_1.Button) {
            throw new Error('Please use only Button components inside ButtonGroup.');
        }
        const { children: text, onClick, id = (0, getRandomId_1.getRandomId)(), ...other } = child.props;
        return { text, onClick, id, ...other };
    });
}
//# sourceMappingURL=formatButtonElement.js.map