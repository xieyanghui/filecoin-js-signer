"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multisig = void 0;
const types_1 = require("../../core/types/types");
class Multisig {
    constructor(tx, signingTools) {
        this.tx = tx;
        this.signingTools = signingTools;
    }
    createMultisig(from, addresses, amount, requiredNumberOfApprovals, nonce, unlockDuration, startEpoch, codeCID = types_1.CodeCID.Multisig, privateKey, network = "mainnet", waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.signingTools.msig.createMultisigMsg(from, addresses, amount, requiredNumberOfApprovals, nonce, unlockDuration, startEpoch, network, codeCID);
            return this.tx.sendMessage(message, privateKey, true, waitMsg);
        });
    }
    proposeMultisig(multisigAddress, from, to, amount, nonce, privateKey, waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.signingTools.msig.proposeMultisigMsg(multisigAddress, from, to, amount, nonce);
            return this.tx.sendMessage(message, privateKey, true, waitMsg);
        });
    }
    approveMultisig(multisigAddress, messageId, requester, from, to, amount, nonce, privateKey, waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.signingTools.msig.approveMultisigMsg(multisigAddress, messageId, requester, from, to, amount, nonce);
            return this.tx.sendMessage(message, privateKey, true, waitMsg);
        });
    }
    cancelMultisig(multisigAddress, messageId, requester, from, to, amount, nonce, privateKey, waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.signingTools.msig.cancelMultisigMsg(multisigAddress, messageId, requester, from, to, amount, nonce);
            return this.tx.sendMessage(message, privateKey, true, waitMsg);
        });
    }
}
exports.Multisig = Multisig;
//# sourceMappingURL=multisig.js.map