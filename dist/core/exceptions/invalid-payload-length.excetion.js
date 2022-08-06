"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPayloadLength = void 0;
class InvalidPayloadLength extends Error {
    constructor() {
        super("Invalid payload length.");
        Object.setPrototypeOf(this, InvalidPayloadLength.prototype);
    }
}
exports.InvalidPayloadLength = InvalidPayloadLength;
//# sourceMappingURL=invalid-payload-length.excetion.js.map