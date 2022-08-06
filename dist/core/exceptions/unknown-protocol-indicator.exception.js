"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownProtocolIndicator = void 0;
class UnknownProtocolIndicator extends Error {
    constructor() {
        super("Unknown protocol indicator byte.");
        Object.setPrototypeOf(this, UnknownProtocolIndicator.prototype);
    }
}
exports.UnknownProtocolIndicator = UnknownProtocolIndicator;
//# sourceMappingURL=unknown-protocol-indicator.exception.js.map