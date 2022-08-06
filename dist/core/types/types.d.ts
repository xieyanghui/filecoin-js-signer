import { BigNumber } from "bignumber.js";
export declare type Address = string;
export declare type PrivateKey = string;
export declare type TokenAmount = BigNumber;
export declare type Nonce = number;
export declare type MsgParams = string;
export declare type CID = string | {
    "/": string;
};
export declare type MessageReceipt = {
    ExitCode: number;
    Return: any;
    GasUsed: number;
};
export declare type MsgLookup = {
    Message: CID;
    Receipt: MessageReceipt;
    ReturnDec: any;
    TipSet: CID[];
    Height: number;
};
export declare type MessageResponse = CID | MsgLookup;
export declare type Network = "mainnet" | "testnet";
export declare type SignedVoucherBase64 = string;
export declare type VoucherBase64 = string;
export declare type HashedSecret = string;
export declare enum ProtocolIndicator {
    ID = 0,
    SECP256K1 = 1,
    ACTOR = 2,
    BLS = 3
}
export declare enum CodeCID {
    PaymentChannel = "fil/4/paymentchannel",
    Multisig = "fil/4/multisig"
}
export declare enum INIT_ACTOR {
    mainnet = "f01",
    testnet = "t01"
}
export declare enum InitMethod {
    None = 0,
    Constructor = 1,
    Exec = 2
}
export declare enum PaymentChannelMethod {
    None = 0,
    Construtor = 1,
    UpdateChannelState = 2,
    Settle = 3,
    Collect = 4
}
export declare enum MultisigMethod {
    None = 0,
    Constructor = 1,
    Propose = 2,
    Approve = 3,
    Cancel = 4,
    AddSigner = 5,
    RemoveSigner = 6,
    SwapSigner = 7,
    ChangeNumApprovalsThreshhold = 8
}
export interface Message {
    Version?: number;
    To: Address;
    From: Address;
    Nonce: Nonce;
    Value: BigNumber;
    GasLimit: number;
    GasFeeCap: BigNumber;
    GasPremium: BigNumber;
    Method: number;
    Params: string;
}
export declare type Voucher = string;
export declare type FilecoinNetwork = "f" | "t";
export interface Signature {
    Data: string;
    Type: number;
}
export interface SignedMessage {
    Message: Message;
    Signature: Signature;
}
