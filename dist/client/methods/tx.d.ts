import { LotusClient } from "filecoin.js";
import { Message, PrivateKey, Network, Address, TokenAmount, MessageResponse } from "../../core/types/types";
import { FilecoinSigner } from "../../signing-tools";
export declare class Tx {
    readonly clientProvider: LotusClient;
    private readonly signingTools;
    constructor(clientProvider: LotusClient, signingTools: FilecoinSigner);
    sendMessage(message: Message, privateKey: PrivateKey, updateMsgNonce?: boolean, waitMsg?: boolean): Promise<MessageResponse>;
    send(to: Address, amount: TokenAmount, gasLimit: number, privateKey: PrivateKey, network: Network, waitMsg?: boolean): Promise<MessageResponse>;
    private pushMessage;
}
