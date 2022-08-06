"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidVoucherSignature = void 0;
class InvalidVoucherSignature extends Error {
    constructor() {
        super("Invalid voucher signature.");
        Object.setPrototypeOf(this, InvalidVoucherSignature.prototype);
    }
}
exports.InvalidVoucherSignature = InvalidVoucherSignature;
//# sourceMappingURL=invalid-voucher-signature.exception.js.map