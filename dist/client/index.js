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
exports.FilecoinClient = void 0;
const filecoin_js_1 = require("filecoin.js");
const Utils = __importStar(require("../signing-tools/methods/utils"));
const payment_channel_1 = require("./methods/payment-channel");
const tx_1 = require("./methods/tx");
const wallet_1 = require("./methods/wallet");
const signing_tools_1 = require("../signing-tools");
const multisig_1 = require("./methods/multisig");
class FilecoinClient {
    constructor(rpcUrl, token) {
        const connector = new filecoin_js_1.HttpJsonRpcConnector({ url: rpcUrl, token });
        this.lotus = new filecoin_js_1.LotusClient(connector);
        this.signingTools = new signing_tools_1.FilecoinSigner();
        this.tx = new tx_1.Tx(this.lotus, this.signingTools);
        this.paych = new payment_channel_1.PaymentChannel(this.tx, this.signingTools);
        this.wallet = new wallet_1.Wallet(this.tx, this.signingTools);
        this.msig = new multisig_1.Multisig(this.tx, this.signingTools);
        this.utils = Utils;
    }
}
exports.FilecoinClient = FilecoinClient;
//# sourceMappingURL=index.js.map