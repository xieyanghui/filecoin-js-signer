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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tx = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class Tx {
    constructor(clientProvider, signingTools) {
        this.clientProvider = clientProvider;
        this.signingTools = signingTools;
    }
    sendMessage(message, privateKey, updateMsgNonce = true, waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (updateMsgNonce) {
                message.Nonce = yield this.clientProvider.mpool.getNonce(message.From);
            }
            return this.pushMessage(message, privateKey, waitMsg);
        });
    }
    send(to, amount, gasLimit, privateKey, network, waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (gasLimit < 1) {
                throw new Error("Invalid gas limit");
            }
            const keys = this.signingTools.wallet.keyRecover(privateKey, network);
            const from = keys.address;
            const nonce = yield this.clientProvider.mpool.getNonce(from);
            const message = {
                From: from,
                To: to,
                Nonce: nonce,
                Value: amount,
                GasLimit: gasLimit,
                GasFeeCap: new bignumber_js_1.default(0),
                GasPremium: new bignumber_js_1.default(0),
                Method: 0,
                Params: "",
            };
            return yield this.pushMessage(message, privateKey, waitMsg);
        });
    }
    pushMessage(message, privateKey, waitMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            const unsignedMessage = yield this.clientProvider.gasEstimate.messageGas(message);
            const signedMessage = JSON.parse(this.signingTools.tx.transactionSignLotus(unsignedMessage, privateKey));
            const CID = yield this.clientProvider.mpool.push(signedMessage);
            if (waitMsg) {
                return yield this.clientProvider.state.waitMsg(CID, 0);
            }
            return CID;
        });
    }
}
exports.Tx = Tx;
//# sourceMappingURL=tx.js.map