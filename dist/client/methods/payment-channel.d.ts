import { Address, CodeCID, HashedSecret, MessageResponse, Network, PrivateKey, SignedVoucherBase64, TokenAmount } from "../../core/types/types";
import { Tx } from "./tx";
import { FilecoinSigner } from "../../signing-tools";
export declare class PaymentChannel {
    private readonly tx;
    private readonly signingTools;
    constructor(tx: Tx, signingTools: FilecoinSigner);
    createPaymentChannel(from: Address, to: Address, amount: TokenAmount, privateKey: PrivateKey, network?: Network, codeCID?: CodeCID, waitMsg?: boolean): Promise<MessageResponse>;
    settlePaymentChannel(paymentChannelAddress: Address, from: Address, privateKey: PrivateKey, waitMsg?: boolean): Promise<MessageResponse>;
    updatePaymentChannel(paymentChannelAddress: Address, from: Address, signedVoucher: SignedVoucherBase64, secret: HashedSecret, privateKey: PrivateKey, waitMsg?: boolean): Promise<MessageResponse>;
    collectPaymentChannel(paymentChannelAddress: Address, from: Address, privateKey: PrivateKey, waitMsg?: boolean): Promise<MessageResponse>;
}
