"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigMethod = exports.PaymentChannelMethod = exports.InitMethod = exports.INIT_ACTOR = exports.CodeCID = exports.ProtocolIndicator = void 0;
var ProtocolIndicator;
(function (ProtocolIndicator) {
    ProtocolIndicator[ProtocolIndicator["ID"] = 0] = "ID";
    ProtocolIndicator[ProtocolIndicator["SECP256K1"] = 1] = "SECP256K1";
    ProtocolIndicator[ProtocolIndicator["ACTOR"] = 2] = "ACTOR";
    ProtocolIndicator[ProtocolIndicator["BLS"] = 3] = "BLS";
})(ProtocolIndicator = exports.ProtocolIndicator || (exports.ProtocolIndicator = {}));
var CodeCID;
(function (CodeCID) {
    CodeCID["PaymentChannel"] = "fil/4/paymentchannel";
    CodeCID["Multisig"] = "fil/4/multisig";
})(CodeCID = exports.CodeCID || (exports.CodeCID = {}));
var INIT_ACTOR;
(function (INIT_ACTOR) {
    INIT_ACTOR["mainnet"] = "f01";
    INIT_ACTOR["testnet"] = "t01";
})(INIT_ACTOR = exports.INIT_ACTOR || (exports.INIT_ACTOR = {}));
var InitMethod;
(function (InitMethod) {
    InitMethod[InitMethod["None"] = 0] = "None";
    InitMethod[InitMethod["Constructor"] = 1] = "Constructor";
    InitMethod[InitMethod["Exec"] = 2] = "Exec";
})(InitMethod = exports.InitMethod || (exports.InitMethod = {}));
var PaymentChannelMethod;
(function (PaymentChannelMethod) {
    PaymentChannelMethod[PaymentChannelMethod["None"] = 0] = "None";
    PaymentChannelMethod[PaymentChannelMethod["Construtor"] = 1] = "Construtor";
    PaymentChannelMethod[PaymentChannelMethod["UpdateChannelState"] = 2] = "UpdateChannelState";
    PaymentChannelMethod[PaymentChannelMethod["Settle"] = 3] = "Settle";
    PaymentChannelMethod[PaymentChannelMethod["Collect"] = 4] = "Collect";
})(PaymentChannelMethod = exports.PaymentChannelMethod || (exports.PaymentChannelMethod = {}));
var MultisigMethod;
(function (MultisigMethod) {
    MultisigMethod[MultisigMethod["None"] = 0] = "None";
    MultisigMethod[MultisigMethod["Constructor"] = 1] = "Constructor";
    MultisigMethod[MultisigMethod["Propose"] = 2] = "Propose";
    MultisigMethod[MultisigMethod["Approve"] = 3] = "Approve";
    MultisigMethod[MultisigMethod["Cancel"] = 4] = "Cancel";
    MultisigMethod[MultisigMethod["AddSigner"] = 5] = "AddSigner";
    MultisigMethod[MultisigMethod["RemoveSigner"] = 6] = "RemoveSigner";
    MultisigMethod[MultisigMethod["SwapSigner"] = 7] = "SwapSigner";
    MultisigMethod[MultisigMethod["ChangeNumApprovalsThreshhold"] = 8] = "ChangeNumApprovalsThreshhold";
})(MultisigMethod = exports.MultisigMethod || (exports.MultisigMethod = {}));
//# sourceMappingURL=types.js.map