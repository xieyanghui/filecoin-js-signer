/// <reference types="node" />
import { Network, PrivateKey } from "../../core/types/types";
import { KeyPair } from "@nodefactory/filecoin-address";
export declare class WalletTools {
    keyRecover(privateKey: PrivateKey, network?: Network): KeyPair;
    generateMnemonic(strength?: number): string;
    keyDerive(mnemonic: string, path: string, network?: Network): KeyPair;
    keyDeriveFromSeed(seed: Buffer, path: string, network?: Network): KeyPair;
}
