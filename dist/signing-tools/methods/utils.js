"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = exports.signMessage = exports.tryToPrivateKeyBuffer = exports.serializeBigNum = exports.getChecksum = exports.bytesToAddress = exports.addressAsBytes = exports.getDigest = exports.createHash = void 0;
const blakejs_1 = __importDefault(require("blakejs"));
const leb128_1 = __importDefault(require("leb128"));
const base32_decode_1 = __importDefault(require("base32-decode"));
const base32_encode_1 = __importDefault(require("base32-encode"));
const bn_js_1 = __importDefault(require("bn.js"));
const assert_1 = __importDefault(require("assert"));
const secp256k1_1 = __importDefault(require("secp256k1"));
const types_1 = require("../../core/types/types");
const filecoin_address_1 = require("@nodefactory/filecoin-address");
const exceptions_1 = require("../../core/exceptions");
const CID_PREFIX = Buffer.from([0x01, 0x71, 0xa0, 0xe4, 0x02, 0x20]);
function createHash(message) {
    const blakeCtx = blakejs_1.default.blake2bInit(32);
    blakejs_1.default.blake2bUpdate(blakeCtx, message);
    return Buffer.from(blakejs_1.default.blake2bFinal(blakeCtx));
}
exports.createHash = createHash;
function getCID(message) {
    const blakeCtx = blakejs_1.default.blake2bInit(32);
    blakejs_1.default.blake2bUpdate(blakeCtx, message);
    const hash = Buffer.from(blakejs_1.default.blake2bFinal(blakeCtx));
    return Buffer.concat([CID_PREFIX, hash]);
}
function getDigest(message) {
    const blakeCtx = blakejs_1.default.blake2bInit(32);
    blakejs_1.default.blake2bUpdate(blakeCtx, getCID(message));
    return Buffer.from(blakejs_1.default.blake2bFinal(blakeCtx));
}
exports.getDigest = getDigest;
function addressAsBytes(address) {
    let addressDecoded;
    let payload;
    let checksum;
    const protocolIndicator = address[1];
    const protocolIndicatorByte = `0${protocolIndicator}`;
    switch (Number(protocolIndicator)) {
        case types_1.ProtocolIndicator.ID:
            if (address.length > 18) {
                throw new exceptions_1.InvalidPayloadLength();
            }
            return Buffer.concat([
                Buffer.from(protocolIndicatorByte, "hex"),
                Buffer.from(leb128_1.default.unsigned.encode(address.substr(2))),
            ]);
        case types_1.ProtocolIndicator.SECP256K1:
            addressDecoded = base32_decode_1.default(address.slice(2).toUpperCase(), "RFC4648");
            payload = addressDecoded.slice(0, -4);
            checksum = Buffer.from(addressDecoded.slice(-4));
            if (payload.byteLength !== 20) {
                throw new exceptions_1.InvalidPayloadLength();
            }
            break;
        case types_1.ProtocolIndicator.ACTOR:
            addressDecoded = base32_decode_1.default(address.slice(2).toUpperCase(), "RFC4648");
            payload = addressDecoded.slice(0, -4);
            checksum = Buffer.from(addressDecoded.slice(-4));
            if (payload.byteLength !== 20) {
                throw new exceptions_1.InvalidPayloadLength();
            }
            break;
        case types_1.ProtocolIndicator.BLS:
            throw new exceptions_1.ProtocolNotSupported("BLS");
        default:
            throw new exceptions_1.UnknownProtocolIndicator();
    }
    const bytesAddress = Buffer.concat([Buffer.from(protocolIndicatorByte, "hex"), Buffer.from(payload)]);
    if (getChecksum(bytesAddress).toString("hex") !== checksum.toString("hex")) {
        throw new exceptions_1.InvalidChecksumAddress();
    }
    return bytesAddress;
}
exports.addressAsBytes = addressAsBytes;
function bytesToAddress(payload, testnet) {
    const protocolIndicator = payload[0];
    switch (Number(protocolIndicator)) {
        case types_1.ProtocolIndicator.ID:
            throw new exceptions_1.ProtocolNotSupported("ID");
        case types_1.ProtocolIndicator.SECP256K1:
            if (payload.slice(1).length !== 20) {
                throw new exceptions_1.InvalidPayloadLength();
            }
            break;
        case types_1.ProtocolIndicator.ACTOR:
            if (payload.slice(1).length !== 20) {
                throw new exceptions_1.InvalidPayloadLength();
            }
            break;
        case types_1.ProtocolIndicator.BLS:
            throw new exceptions_1.ProtocolNotSupported("BLS");
        default:
            throw new exceptions_1.UnknownProtocolIndicator();
    }
    const checksum = getChecksum(payload);
    let prefix = "f";
    if (testnet) {
        prefix = "t";
    }
    prefix += protocolIndicator;
    return (prefix +
        base32_encode_1.default(Buffer.concat([payload.slice(1), checksum]), "RFC4648", {
            padding: false,
        }).toLowerCase());
}
exports.bytesToAddress = bytesToAddress;
function getChecksum(payload) {
    const blakeCtx = blakejs_1.default.blake2bInit(4);
    blakejs_1.default.blake2bUpdate(blakeCtx, payload);
    return Buffer.from(blakejs_1.default.blake2bFinal(blakeCtx));
}
exports.getChecksum = getChecksum;
function serializeBigNum(value) {
    if (value === "0") {
        return Buffer.from("");
    }
    const valueBigInt = new bn_js_1.default(value, 10);
    const valueBuffer = valueBigInt.toArrayLike(Buffer, "be", valueBigInt.byteLength());
    return Buffer.concat([Buffer.from("00", "hex"), valueBuffer]);
}
exports.serializeBigNum = serializeBigNum;
function tryToPrivateKeyBuffer(privateKey) {
    if (typeof privateKey === "string") {
        if (privateKey.slice(-1) === "=") {
            privateKey = Buffer.from(privateKey, "base64");
        }
        else {
            privateKey = Buffer.from(privateKey, "hex");
        }
    }
    assert_1.default(privateKey.length === 32);
    return privateKey;
}
exports.tryToPrivateKeyBuffer = tryToPrivateKeyBuffer;
function signMessage(message, privateKey) {
    const privateKeyBuffer = tryToPrivateKeyBuffer(privateKey);
    const messageDigest = getDigest(message);
    const signature = secp256k1_1.default.ecdsaSign(messageDigest, privateKeyBuffer);
    const signatureResult = Buffer.concat([Buffer.from(signature.signature), Buffer.from([signature.recid])]);
    return Buffer.from(signatureResult).toString("hex");
}
exports.signMessage = signMessage;
function verifySignature(message, signature, signerAddress) {
    const signatureBuffer = Buffer.from(signature, "hex");
    const messageDigest = getDigest(message);
    const publicKey = secp256k1_1.default.ecdsaRecover(signatureBuffer.slice(0, -1), signatureBuffer[64], messageDigest, false);
    const network = signerAddress[0];
    if (filecoin_address_1.publicKeyToAddress(publicKey, network) !== signerAddress) {
        throw new Error("Recovered address does not match the signer address");
    }
    return secp256k1_1.default.ecdsaVerify(signatureBuffer.slice(0, -1), messageDigest, publicKey);
}
exports.verifySignature = verifySignature;
//# sourceMappingURL=utils.js.map