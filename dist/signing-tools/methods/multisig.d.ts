import { Address, CodeCID, Message, MsgParams, Network, TokenAmount } from "../../core/types/types";
export declare class MultisigTools {
    createMsigParams(addresses: Address[], requiredNumberOfApprovals: number, unlockDuration: number, startEpoch: number, codeCID: CodeCID): Promise<MsgParams>;
    createMultisigMsg(from: Address, addresses: Address[], amount: TokenAmount, requiredNumberOfApprovals: number, nonce: number, unlockDuration: number, startEpoch: number, network?: Network, codeCID?: CodeCID): Promise<Message>;
    proposeMsigMsgParams(to: Address, amount: TokenAmount): MsgParams;
    proposeMultisigMsg(multisigAddress: Address, from: Address, to: Address, amount: TokenAmount, nonce: number): Message;
    approveOrCancelMsigMsgParams(messageId: number, requester: Address, to: Address, amount: TokenAmount): MsgParams;
    approveMultisigMsg(multisigAddress: Address, messageId: number, requester: Address, from: Address, to: Address, amount: TokenAmount, nonce: number): Message;
    cancelMultisigMsg(multisigAddress: Address, messageId: number, requester: Address, from: Address, to: Address, amount: TokenAmount, nonce: number): Message;
}
