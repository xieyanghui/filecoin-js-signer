import { Message, PrivateKey, Network, SignedMessage } from "../../core/types/types";
export declare class TxTools {
    transactionParse(cborMessage: string, network: Network): {
        to: string;
        from: string;
        nonce: any;
        value: any;
        gaslimit: any;
        gasfeecap: any;
        gaspremium: any;
        method: any;
        params: any;
    };
    transactionSerializeRaw(message: Message): Uint8Array;
    transactionSignLotus(unsignedMessage: string | Message, privateKey: PrivateKey): string;
    transactionVerifyLotus(signedMessage: SignedMessage): boolean;
}
