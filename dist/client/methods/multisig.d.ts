import { Tx } from "./tx";
import { FilecoinSigner } from "../../signing-tools";
import { Address, CodeCID, MessageResponse, Network, PrivateKey, TokenAmount } from "../../core/types/types";
export declare class Multisig {
    private readonly tx;
    private readonly signingTools;
    constructor(tx: Tx, signingTools: FilecoinSigner);
    createMultisig(from: Address, addresses: Address[], amount: TokenAmount, requiredNumberOfApprovals: number, nonce: number, unlockDuration: number, startEpoch: number, codeCID: CodeCID, privateKey: PrivateKey, network?: Network, waitMsg?: boolean): Promise<MessageResponse>;
    proposeMultisig(multisigAddress: Address, from: Address, to: Address, amount: TokenAmount, nonce: number, privateKey: PrivateKey, waitMsg?: boolean): Promise<MessageResponse>;
    approveMultisig(multisigAddress: Address, messageId: number, requester: Address, from: Address, to: Address, amount: TokenAmount, nonce: number, privateKey: PrivateKey, waitMsg?: boolean): Promise<MessageResponse>;
    cancelMultisig(multisigAddress: Address, messageId: number, requester: Address, from: Address, to: Address, amount: TokenAmount, nonce: number, privateKey: PrivateKey, waitMsg?: boolean): Promise<MessageResponse>;
}
