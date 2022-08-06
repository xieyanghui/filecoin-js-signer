"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidChecksumAddress = void 0;
class InvalidChecksumAddress extends Error {
    constructor() {
        super("Invalid address (checksum not matching the payload).");
        Object.setPrototypeOf(this, InvalidChecksumAddress.prototype);
    }
}
exports.InvalidChecksumAddress = InvalidChecksumAddress;
//# sourceMappingURL=invalid-checksum-address.exception.js.map