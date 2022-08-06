"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTools = void 0;
const filecoin_address_1 = require("@nodefactory/filecoin-address");
const bip39_1 = require("bip39");
const bip32_1 = require("bip32");
class WalletTools {
    keyRecover(privateKey, network = "mainnet") {
        if (privateKey.slice(-1) === "=") {
            privateKey = Buffer.from(privateKey, "base64").toString("hex");
        }
        return filecoin_address_1.keyPairFromPrivateKey(privateKey, network === "mainnet" ? "f" : "t");
    }
    generateMnemonic(strength = 128) {
        return bip39_1.generateMnemonic(strength);
    }
    keyDerive(mnemonic, path, network = "mainnet") {
        const seed = bip39_1.mnemonicToSeedSync(mnemonic);
        return this.keyDeriveFromSeed(seed, path, network);
    }
    keyDeriveFromSeed(seed, path, network = "mainnet") {
        const masterKey = bip32_1.fromSeed(seed);
        const childKey = masterKey.derivePath(path);
        return this.keyRecover(Buffer.from(childKey.privateKey).toString("hex"), network);
    }
}
exports.WalletTools = WalletTools;
//# sourceMappingURL=wallet.js.map