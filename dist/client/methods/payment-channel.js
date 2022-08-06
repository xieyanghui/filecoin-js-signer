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
exports.PaymentChannel = void 0;
const types_1 = require("../../core/types/types");
class PaymentChannel {
    constructor(tx, signingTools) {
        this.tx = tx;
        this.signingTools = signingTools;
    }
    createPaymentChannel(from, to, amount, privateKey, network = "mainnet", codeCID = types_1.CodeCID.PaymentChannel, waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.signingTools.paych.createPaymentChannelMsg(from, to, amount, 0, network, codeCID);
            return this.tx.sendMessage(message, privateKey, true, waitMsg);
        });
    }
    settlePaymentChannel(paymentChannelAddress, from, privateKey, waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.signingTools.paych.settlePaymentChannelMsg(paymentChannelAddress, from, 0);
            return this.tx.sendMessage(message, privateKey, true, waitMsg);
        });
    }
    updatePaymentChannel(paymentChannelAddress, from, signedVoucher, secret, privateKey, waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.signingTools.paych.updatePaymentChannelMsg(paymentChannelAddress, from, signedVoucher, secret, 0);
            return this.tx.sendMessage(message, privateKey, true, waitMsg);
        });
    }
    collectPaymentChannel(paymentChannelAddress, from, privateKey, waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.signingTools.paych.collectPaymentChannelMsg(paymentChannelAddress, from, 0);
            return this.tx.sendMessage(message, privateKey, true, waitMsg);
        });
    }
}
exports.PaymentChannel = PaymentChannel;
//# sourceMappingURL=payment-channel.js.map