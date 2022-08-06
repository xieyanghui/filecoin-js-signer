import { Address, CodeCID, HashedSecret, Message, MsgParams, Network, Nonce, PrivateKey, SignedVoucherBase64, TokenAmount, VoucherBase64 } from "../../core/types/types";
export declare class PaymentChannelTools {
    createPayChMsgParams(from: Address, to: Address, codeCID: CodeCID): Promise<MsgParams>;
    createPaymentChannelMsg(from: Address, to: Address, amount: TokenAmount, nonce: Nonce, network?: Network, codeCID?: CodeCID): Promise<Message>;
    createVoucher(paymentChannelAddress: Address, timeLockMin: number, timeLockMax: number, secretHash: string, amount: TokenAmount, lane: number, voucherNonce: number, minSettleHeight: number): VoucherBase64;
    signVoucher(voucher: VoucherBase64, privateKey: PrivateKey): SignedVoucherBase64;
    verifyVoucherSignature(sv: SignedVoucherBase64, signerAddress: Address): boolean;
    updatePaymentChannelMsg(paymentChannelAddress: Address, from: Address, sv: SignedVoucherBase64, secret: HashedSecret, nonce: number, gasLimit?: number, gasFeeCap?: string, gasPremium?: string): Message;
    settlePaymentChannelMsg(paymentChannelAddress: Address, from: Address, nonce: Nonce, gasLimit?: number, gasFeeCap?: string, gasPremium?: string): Message;
    collectPaymentChannelMsg(paymentChannelAddress: Address, from: Address, nonce: Nonce, gasLimit?: number, gasFeeCap?: string, gasPremium?: string): Message;
}
