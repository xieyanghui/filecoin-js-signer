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
exports.Wallet = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class Wallet {
    constructor(tx, signingTools) {
        this.tx = tx;
        this.signingTools = signingTools;
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.tx.clientProvider.wallet.balance(address);
            const d = new bignumber_js_1.default(10).pow(18);
            return new bignumber_js_1.default(balance).multipliedBy(d);
        });
    }
    transfer(to, amount, gasLimit, privateKey, network = "mainnet", waitMsg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tx.send(to, amount, gasLimit, privateKey, network, waitMsg);
        });
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map