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
exports.MultisigTools = void 0;
const types_1 = require("../../core/types/types");
const ipld_dag_cbor_1 = __importDefault(require("ipld-dag-cbor"));
const utils_1 = require("./utils");
const multihashing_async_1 = require("multihashing-async");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class MultisigTools {
    createMsigParams(addresses, requiredNumberOfApprovals, unlockDuration, startEpoch, codeCID) {
        return __awaiter(this, void 0, void 0, function* () {
            const byteAddresses = addresses.map((add) => utils_1.addressAsBytes(add));
            let constructorParams = ipld_dag_cbor_1.default.util.serialize([
                [byteAddresses, requiredNumberOfApprovals, unlockDuration, startEpoch],
            ]);
            constructorParams = constructorParams.slice(1);
            const cid = yield ipld_dag_cbor_1.default.util.cid(Buffer.from(codeCID), {
                hashAlg: multihashing_async_1.multihash.names["identity"],
            });
            const params = [cid, constructorParams];
            const serializedParams = ipld_dag_cbor_1.default.util.serialize(params);
            return Buffer.from(serializedParams).toString("base64");
        });
    }
    createMultisigMsg(from, addresses, amount, requiredNumberOfApprovals, nonce, unlockDuration, startEpoch, network = "mainnet", codeCID = types_1.CodeCID.Multisig) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                From: from,
                To: types_1.INIT_ACTOR[network],
                Nonce: nonce,
                Value: amount,
                GasLimit: 0,
                GasFeeCap: new bignumber_js_1.default(0),
                GasPremium: new bignumber_js_1.default(0),
                Method: types_1.InitMethod.Exec,
                Params: yield this.createMsigParams(addresses, requiredNumberOfApprovals, unlockDuration, startEpoch, codeCID),
            };
            return message;
        });
    }
    proposeMsigMsgParams(to, amount) {
        const proposeParams = ipld_dag_cbor_1.default.util.serialize([
            [utils_1.addressAsBytes(to), utils_1.serializeBigNum(amount.toString()), 0, new Buffer(0)],
        ]);
        return Buffer.from(proposeParams.slice(1)).toString("base64");
    }
    proposeMultisigMsg(multisigAddress, from, to, amount, nonce) {
        const message = {
            From: from,
            To: multisigAddress,
            Nonce: nonce,
            Value: new bignumber_js_1.default(0),
            GasLimit: 0,
            GasFeeCap: new bignumber_js_1.default(0),
            GasPremium: new bignumber_js_1.default(0),
            Method: types_1.MultisigMethod.Propose,
            Params: this.proposeMsigMsgParams(to, amount),
        };
        return message;
    }
    approveOrCancelMsigMsgParams(messageId, requester, to, amount) {
        const proposeParams = ipld_dag_cbor_1.default.util.serialize([
            [utils_1.addressAsBytes(requester), utils_1.addressAsBytes(to), utils_1.serializeBigNum(amount.toString()), 0, new Buffer(0)],
        ]);
        const serializedProposalParams = Buffer.from(proposeParams.slice(1));
        const hash = utils_1.createHash(serializedProposalParams);
        const params = ipld_dag_cbor_1.default.util.serialize([[messageId, hash]]);
        return Buffer.from(params).slice(1).toString("base64");
    }
    approveMultisigMsg(multisigAddress, messageId, requester, from, to, amount, nonce) {
        const message = {
            From: from,
            To: multisigAddress,
            Nonce: nonce,
            Value: new bignumber_js_1.default(0),
            GasLimit: 0,
            GasFeeCap: new bignumber_js_1.default(0),
            GasPremium: new bignumber_js_1.default(0),
            Method: types_1.MultisigMethod.Approve,
            Params: this.approveOrCancelMsigMsgParams(messageId, requester, to, amount),
        };
        return message;
    }
    cancelMultisigMsg(multisigAddress, messageId, requester, from, to, amount, nonce) {
        const message = {
            From: from,
            To: multisigAddress,
            Nonce: nonce,
            Value: new bignumber_js_1.default(0),
            GasLimit: 0,
            GasFeeCap: new bignumber_js_1.default(0),
            GasPremium: new bignumber_js_1.default(0),
            Method: types_1.MultisigMethod.Cancel,
            Params: this.approveOrCancelMsigMsgParams(messageId, requester, to, amount),
        };
        return message;
    }
}
exports.MultisigTools = MultisigTools;
//# sourceMappingURL=multisig.js.map