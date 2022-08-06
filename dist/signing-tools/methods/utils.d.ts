/// <reference types="node" />
import { Address, PrivateKey } from "../../core/types/types";
export declare function createHash(message: any): Buffer;
export declare function getDigest(message: any): Buffer;
export declare function addressAsBytes(address: Address): Buffer;
export declare function bytesToAddress(payload: any, testnet: any): string;
export declare function getChecksum(payload: any): Buffer;
export declare function serializeBigNum(value: string): Buffer;
export declare function tryToPrivateKeyBuffer(privateKey: any): any;
export declare function signMessage(message: any, privateKey: PrivateKey): string;
export declare function verifySignature(message: string, signature: string, signerAddress: Address): boolean;
