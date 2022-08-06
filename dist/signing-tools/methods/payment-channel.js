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
exports.PaymentChannelTools = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const ipld_dag_cbor_1 = __importDefault(require("ipld-dag-cbor"));
const multihashing_async_1 = require("multihashing-async");
const secp256k1_1 = __importDefault(require("secp256k1"));
const blake2b_1 = __importDefault(require("blake2b"));
const filecoin_address_1 = require("@nodefactory/filecoin-address");
const types_1 = require("../../core/types/types");
const utils_1 = require("./utils");
const exceptions_1 = require("../../core/exceptions");
class PaymentChannelTools {
    createPayChMsgParams(from, to, codeCID) {
        return __awaiter(this, void 0, void 0, function* () {
            const constructorParams = ipld_dag_cbor_1.default.util.serialize([utils_1.addressAsBytes(from), utils_1.addressAsBytes(to)]);
            const cid = yield ipld_dag_cbor_1.default.util.cid(Buffer.from(codeCID), {
                hashAlg: multihashing_async_1.multihash.names["identity"],
            });
            const params = [cid, constructorParams];
            const serializedParams = ipld_dag_cbor_1.default.util.serialize(params);
            return Buffer.from(serializedParams).toString("base64");
        });
    }
    createPaymentChannelMsg(from, to, amount, nonce, network = "mainnet", codeCID = types_1.CodeCID.PaymentChannel) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                From: from,
                To: types_1.INIT_ACTOR[network],
                Nonce: nonce,
                Value: amount,
                GasLimit: 10000000,
                GasFeeCap: new bignumber_js_1.default(0),
                GasPremium: new bignumber_js_1.default(0),
                Method: types_1.InitMethod.Exec,
                Params: yield this.createPayChMsgParams(from, to, codeCID),
            };
            return message;
        });
    }
    createVoucher(paymentChannelAddress, timeLockMin, timeLockMax, secretHash, amount, lane, voucherNonce, minSettleHeight) {
        const voucher = [
            utils_1.addressAsBytes(paymentChannelAddress),
            timeLockMin,
            timeLockMax,
            Buffer.from(secretHash, "hex"),
            null,
            lane,
            voucherNonce,
            utils_1.serializeBigNum(amount.toString()),
            minSettleHeight,
            [],
            null,
        ];
        const serializedVoucher = ipld_dag_cbor_1.default.util.serialize(voucher);
        return Buffer.from(serializedVoucher).toString("base64");
    }
    signVoucher(voucher, privateKey) {
        const cborUnsignedVoucher = Buffer.from(voucher, "base64");
        privateKey = utils_1.tryToPrivateKeyBuffer(privateKey);
        const messageDigest = blake2b_1.default(32).update(cborUnsignedVoucher).digest();
        const signature = secp256k1_1.default.ecdsaSign(messageDigest, privateKey);
        const unsignedVoucher = ipld_dag_cbor_1.default.util.deserialize(cborUnsignedVoucher);
        const sig = Buffer.concat([
            Buffer.from([1]),
            Buffer.from(signature.signature),
            Buffer.from([signature.recid]),
        ]);
        unsignedVoucher[10] = sig;
        const signedVoucher = ipld_dag_cbor_1.default.util.serialize(unsignedVoucher);
        return Buffer.from(signedVoucher).toString("base64");
    }
    verifyVoucherSignature(sv, signerAddress) {
        const cborSignedVoucher = Buffer.from(sv, "base64");
        const signedVoucher = ipld_dag_cbor_1.default.util.deserialize(cborSignedVoucher);
        if (signedVoucher[10] === null || !signedVoucher[10]) {
            throw new exceptions_1.InvalidVoucherSignature();
        }
        const unsignedVoucher = Object.assign([], signedVoucher);
        unsignedVoucher[10] = null;
        const cborUnsignedVoucher = ipld_dag_cbor_1.default.util.serialize(unsignedVoucher);
        const messageDigest = blake2b_1.default(32).update(cborUnsignedVoucher).digest();
        const signature = signedVoucher[10].slice(1);
        const protocolIndicator = signerAddress[1];
        switch (Number(protocolIndicator)) {
            case types_1.ProtocolIndicator.SECP256K1:
                const sig = signature.slice(0, -1);
                const recoveryId = signature[64];
                const publicKey = secp256k1_1.default.ecdsaRecover(sig, recoveryId, messageDigest, false);
                const network = signerAddress[0];
                if (filecoin_address_1.publicKeyToAddress(publicKey, network) !== signerAddress) {
                    throw new Error("Recovered address does not match the signer address");
                }
                return secp256k1_1.default.ecdsaVerify(sig, messageDigest, publicKey);
            case types_1.ProtocolIndicator.BLS:
                throw new exceptions_1.ProtocolNotSupported("BLS");
            default:
                throw new exceptions_1.UnknownProtocolIndicator();
        }
    }
    updatePaymentChannelMsg(paymentChannelAddress, from, sv, secret, nonce, gasLimit = 0, gasFeeCap = "0", gasPremium = "0") {
        const cborSignedVoucher = Buffer.from(sv, "base64");
        const signedVoucher = ipld_dag_cbor_1.default.util.deserialize(cborSignedVoucher);
        const serializedParams = ipld_dag_cbor_1.default.util.serialize([signedVoucher, Buffer.from(secret, "hex")]);
        const message = {
            From: from,
            To: paymentChannelAddress,
            Nonce: nonce,
            Value: new bignumber_js_1.default(0),
            GasLimit: gasLimit,
            GasFeeCap: new bignumber_js_1.default(gasFeeCap),
            GasPremium: new bignumber_js_1.default(gasPremium),
            Method: types_1.PaymentChannelMethod.UpdateChannelState,
            Params: Buffer.from(serializedParams).toString("base64"),
        };
        return message;
    }
    settlePaymentChannelMsg(paymentChannelAddress, from, nonce, gasLimit = 0, gasFeeCap = "0", gasPremium = "0") {
        const message = {
            From: from,
            To: paymentChannelAddress,
            Nonce: nonce,
            Value: new bignumber_js_1.default(0),
            GasLimit: gasLimit,
            GasFeeCap: new bignumber_js_1.default(gasFeeCap),
            GasPremium: new bignumber_js_1.default(gasPremium),
            Method: types_1.PaymentChannelMethod.Settle,
            Params: "",
        };
        return message;
    }
    collectPaymentChannelMsg(paymentChannelAddress, from, nonce, gasLimit = 0, gasFeeCap = "0", gasPremium = "0") {
        const message = {
            From: from,
            To: paymentChannelAddress,
            Nonce: nonce,
            Value: new bignumber_js_1.default(0),
            GasLimit: gasLimit,
            GasFeeCap: new bignumber_js_1.default(gasFeeCap),
            GasPremium: new bignumber_js_1.default(gasPremium),
            Method: types_1.PaymentChannelMethod.Collect,
            Params: "",
        };
        return message;
    }
}
exports.PaymentChannelTools = PaymentChannelTools;
//# sourceMappingURL=payment-channel.js.map