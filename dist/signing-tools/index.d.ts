import * as Utils from "./methods/utils";
import { PaymentChannelTools } from "./methods/payment-channel";
import { TxTools } from "./methods/tx";
import { WalletTools } from "./methods/wallet";
import { MultisigTools } from "./methods/multisig";
export declare class FilecoinSigner {
    readonly paych: PaymentChannelTools;
    readonly tx: TxTools;
    readonly wallet: WalletTools;
    readonly msig: MultisigTools;
    readonly utils: typeof Utils;
    constructor();
}
