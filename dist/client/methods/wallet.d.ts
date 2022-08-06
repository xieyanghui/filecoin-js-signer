import { Address, MessageResponse, Network, PrivateKey, TokenAmount } from "../../core/types/types";
import { Tx } from "./tx";
import { FilecoinSigner } from "../../signing-tools";
export declare class Wallet {
    private readonly tx;
    private readonly signingTools;
    constructor(tx: Tx, signingTools: FilecoinSigner);
    getBalance(address: Address): Promise<TokenAmount>;
    transfer(to: Address, amount: TokenAmount, gasLimit: number, privateKey: PrivateKey, network?: Network, waitMsg?: boolean): Promise<MessageResponse>;
}
