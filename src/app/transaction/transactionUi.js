import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Close, ErrorOutline } from "@material-ui/icons";
import { PublicKey } from "@solana/web3.js";
import { doTransfer } from "./transactionService";
import {
  resetError,
  resetTransaction,
  setError,
  setupTransaction,
} from "./actions";

export const TransactionPage = () => {
  const dispatch = useDispatch();
  const transferClicked = () => {
    const targetAddress = document.getElementById("token-reciever-input").value;
    const transferAmount = document.getElementById("token-amount-input").value;
    // basic input validation
    try {
      const k = new PublicKey(targetAddress);
      if (!targetAddress || !transferAmount) {
        dispatch(setError("Please Fill in all fields"));
        return;
      }

      if (parseFloat(transferAmount) <= 0) {
        dispatch(setError("Please Choose A Proper Transfer Amount"));
        return;
      }
    } catch (e) {
      dispatch(setError(e.message));
      return;
    }

    dispatch(
      setupTransaction({
        targetAddress,
        transferAmount,
      })
    );
    dispatch(doTransfer);
  };

  return (
    <div className="transfer-container center">
      <div className="logo-box">
        <img
          className="logo-image"
          src="./assets/img/logo.small.png"
          alt="logo"
        />
      </div>
      <h1>Transfer XEN</h1>
      <form className="transfer-form">
        <div className="form-group">
          <span>Address</span>
          <input
            name="token-rec-addr"
            className="form-field"
            placeholder={"Receiver's Address"}
            id="token-reciever-input"
          />
        </div>
        <div className="form-group">
          <span>Amount</span>
          <input
            name="token-transfer-amount"
            className="form-field"
            type="number"
            min={0}
            id="token-amount-input"
          />
        </div>
      </form>

      <button id="transfer-btn" onClick={transferClicked} className="button">
        Transfer
      </button>
      <ErrorPopup />
      <TransactionResultModal />
      <LoadingSpinner />
    </div>
  );
};

const ErrorPopup = () => {
  const isError = useSelector((store) => store.transaction.isError);
  const msg = useSelector((store) => store.transaction.transactionError);
  const dispatch = useDispatch();
  if (!isError) {
    return <div />;
  }
  return (
    <div className="error-popup">
      <ErrorOutline fontSize="large" />
      <span className="error-message">{msg.toString()}</span>

      <Close
        className="close-error-popup"
        style={{ fontSize: 17, fontWeight: 700 }}
        onClick={() => dispatch(resetError())}
      />
    </div>
  );
};

const LoadingSpinner = () => {
  const transactionInProgress = useSelector(
    (store) => store.transaction.transactionInProgress
  );
  const transactionComplete = useSelector(
    (store) => store.transaction.transactionComplete
  );

  if (!transactionComplete && transactionInProgress) {
    return (
      <div className="loading-spinner">
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }

  return <></>;
};

// Todo: show live status of transaction
const TransactionResultModal = (props) => {
  const dispatch = useDispatch();
  const transactionInProgress = useSelector(
    (store) => store.transaction.transactionInProgress
  );
  const transactionComplete = useSelector(
    (store) => store.transaction.transactionComplete
  );
  const transactionSignature = useSelector(
    (store) => store.transaction.transactionSignature
  );
  if (
    !transactionInProgress &&
    transactionComplete &&
    transactionSignature !== null
  ) {
    // set the same class as wallet-provider-modal b/c of same properties
    return (
      <div className="wallet-provider-overlay">
        <div className="transaction-status-modal wallet-provider-modal">
          <span className="transactionSignature">
            Signature: {transactionSignature}
          </span>
          <Close
            className="transaction-result-modal-close "
            style={{ fontSize: 40 }}
            onClick={() => dispatch(resetTransaction())}
          />
        </div>
      </div>
    );
  }
  return <></>;
};
