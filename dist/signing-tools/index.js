"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilecoinSigner = void 0;
const Utils = __importStar(require("./methods/utils"));
const payment_channel_1 = require("./methods/payment-channel");
const tx_1 = require("./methods/tx");
const wallet_1 = require("./methods/wallet");
const multisig_1 = require("./methods/multisig");
class FilecoinSigner {
    constructor() {
        this.tx = new tx_1.TxTools();
        this.paych = new payment_channel_1.PaymentChannelTools();
        this.wallet = new wallet_1.WalletTools();
        this.msig = new multisig_1.MultisigTools();
        this.utils = Utils;
    }
}
exports.FilecoinSigner = FilecoinSigner;
//# sourceMappingURL=index.js.map