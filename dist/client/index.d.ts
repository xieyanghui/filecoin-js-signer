import * as Utils from "../signing-tools/methods/utils";
import { PaymentChannel } from "./methods/payment-channel";
import { Tx } from "./methods/tx";
import { Wallet } from "./methods/wallet";
import { FilecoinSigner } from "../signing-tools";
import { Multisig } from "./methods/multisig";
export declare class FilecoinClient {
    private readonly lotus;
    readonly paych: PaymentChannel;
    readonly tx: Tx;
    readonly wallet: Wallet;
    readonly msig: Multisig;
    readonly utils: typeof Utils;
    readonly signingTools: FilecoinSigner;
    constructor(rpcUrl: string, token?: string);
}
