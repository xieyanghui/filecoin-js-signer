"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxTools = void 0;
const secp256k1_1 = __importDefault(require("secp256k1"));
const lowercase_keys_1 = __importDefault(require("lowercase-keys"));
const ipld_dag_cbor_1 = __importDefault(require("ipld-dag-cbor"));
const bn_js_1 = __importDefault(require("bn.js"));
const utils_1 = require("./utils");
const types_1 = require("../../core/types/types");
const filecoin_address_1 = require("@nodefactory/filecoin-address");
class TxTools {
    transactionParse(cborMessage, network) {
        const decoded = ipld_dag_cbor_1.default.util.deserialize(Buffer.from(cborMessage, "hex"));
        if (decoded[0] !== 0) {
            throw new Error("Unsupported version");
        }
        if (Object.values(decoded).length < 10) {
            throw new Error("The cbor message is missing some fields... please verify you have 9 fields");
        }
        if (decoded[4][0] === 0x01) {
            throw new Error("Value can't be negative");
        }
        const message = {
            to: utils_1.bytesToAddress(decoded[1], network === "testnet"),
            from: utils_1.bytesToAddress(decoded[2], network === "testnet"),
            nonce: decoded[3],
            value: new bn_js_1.default(decoded[4].toString("hex"), 16).toString(10),
            gaslimit: decoded[5],
            gasfeecap: new bn_js_1.default(decoded[6].toString("hex"), 16).toString(10),
            gaspremium: new bn_js_1.default(decoded[7].toString("hex"), 16).toString(10),
            method: decoded[8],
            params: decoded[9].toString(),
        };
        return message;
    }
    transactionSerializeRaw(message) {
        const to = utils_1.addressAsBytes(message.To);
        const from = utils_1.addressAsBytes(message.From);
        const value = utils_1.serializeBigNum(message.Value.toString());
        const gasfeecap = utils_1.serializeBigNum(message.GasFeeCap.toString());
        const gaspremium = utils_1.serializeBigNum(message.GasPremium.toString());
        const messageToEncode = [
            0,
            to,
            from,
            message.Nonce,
            value,
            message.GasLimit,
            gasfeecap,
            gaspremium,
            message.Method,
            Buffer.from(message.Params, "base64"),
        ];
        return ipld_dag_cbor_1.default.util.serialize(messageToEncode);
    }
    transactionSignLotus(unsignedMessage, privateKey) {
        let message;
        if (typeof unsignedMessage === "object") {
            message = this.transactionSerializeRaw(unsignedMessage);
        }
        if (typeof unsignedMessage === "string") {
            message = Buffer.from(unsignedMessage, "hex");
        }
        const privateKeyBuffer = utils_1.tryToPrivateKeyBuffer(privateKey);
        const messageDigest = utils_1.getDigest(message);
        let signature = secp256k1_1.default.ecdsaSign(messageDigest, privateKeyBuffer);
        signature = Buffer.concat([Buffer.from(signature.signature), Buffer.from([signature.recid])]);
        const signedMessage = {
            signature: {
                data: signature.toString("base64"),
                type: types_1.ProtocolIndicator.SECP256K1,
            },
            message: lowercase_keys_1.default(unsignedMessage),
        };
        return JSON.stringify({
            Message: {
                From: signedMessage.message.from,
                GasLimit: signedMessage.message.gaslimit,
                GasFeeCap: signedMessage.message.gasfeecap,
                GasPremium: signedMessage.message.gaspremium,
                Method: signedMessage.message.method,
                Nonce: signedMessage.message.nonce,
                Params: signedMessage.message.params,
                To: signedMessage.message.to,
                Value: signedMessage.message.value,
            },
            Signature: {
                Data: signedMessage.signature.data,
                Type: signedMessage.signature.type,
            },
        });
    }
    transactionVerifyLotus(signedMessage) {
        const signatureBuffer = Buffer.from(signedMessage.Signature.Data, "base64");
        const message = this.transactionSerializeRaw(signedMessage.Message);
        const messageDigest = utils_1.getDigest(message);
        const publicKey = secp256k1_1.default.ecdsaRecover(signatureBuffer.slice(0, -1), signatureBuffer[64], messageDigest, false);
        const network = signedMessage.Message.From[0];
        if (filecoin_address_1.publicKeyToAddress(publicKey, network) !== signedMessage.Message.From) {
            throw new Error("Recovered address does not match the signer address");
        }
        return secp256k1_1.default.ecdsaVerify(signatureBuffer.slice(0, -1), messageDigest, publicKey);
    }
}
exports.TxTools = TxTools;
//# sourceMappingURL=tx.js.map