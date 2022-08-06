"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolNotSupported = void 0;
class ProtocolNotSupported extends Error {
    constructor(protocolName) {
        super(`${protocolName} protocol not supported.`);
        this.protocolName = protocolName;
        Object.setPrototypeOf(this, ProtocolNotSupported.prototype);
    }
}
exports.ProtocolNotSupported = ProtocolNotSupported;
//# sourceMappingURL=protocol-not-supported.exception.js.map