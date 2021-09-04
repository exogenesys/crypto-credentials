import React from "react";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  resetError,
  resetTransaction,
  setError,
  setupTransaction,
} from "./actions";
import { doTransfer, requestAirdrop } from "./universityService";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormGroup from "@material-ui/core/FormGroup";
import { Close, ErrorOutline } from "@material-ui/icons";
import { PublicKey } from "@solana/web3.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";

const TransactionPage = () => {
  let dispatch = useDispatch();
  const transferClicked = () => {
    let targetAddress = document.getElementById("token-reciever-input").value;
    let transferAmount = document.getElementById("token-amount-input").value;
    // basic input validation
    try {
      let k = new PublicKey(targetAddress);
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
        targetAddress: targetAddress,
        transferAmount: transferAmount,
      })
    );
    dispatch(doTransfer);
  };

  return (
    <div className={"transfer-container center"}>
      <div className={"logo-box"}>
        <img
          className={"logo-image"}
          src={"./assets/img/logo.small.png"}
          alt={"logo"}
        />
      </div>
      <h1>Transfer XEN</h1>
      <form className={"transfer-form"}>
        <div className={"form-group"}>
          <span>Address</span>
          <input
            name={"token-rec-addr"}
            className="form-field"
            placeholder={"Receiver's Address"}
            id={"token-reciever-input"}
          />
        </div>
        <div className={"form-group"}>
          <span>Amount</span>
          <input
            name="token-transfer-amount"
            className="form-field"
            type={"number"}
            min={0}
            id={"token-amount-input"}
          />
        </div>
      </form>

      <button id="transfer-btn" onClick={transferClicked} className={"button"}>
        Transfer
      </button>
      <ErrorPopup />
      <TransactionResultModal />
      <LoadingSpinner />
    </div>
  );
};

const ErrorPopup = () => {
  let isError = useSelector((store) => store.transaction.isError);
  let msg = useSelector((store) => store.transaction.transactionError);
  let dispatch = useDispatch();
  if (!isError) {
    return <div />;
  }
  return (
    <div className={"error-popup"}>
      <ErrorOutline fontSize={"large"} />
      <span className={"error-message"}>{msg.toString()}</span>

      <Close
        className={"close-error-popup"}
        style={{ fontSize: 17, fontWeight: 700 }}
        onClick={() => dispatch(resetError())}
      />
    </div>
  );
};

const LoadingSpinner = () => {
  let transactionInProgress = useSelector(
    (store) => store.transaction.transactionInProgress
  );
  let transactionComplete = useSelector(
    (store) => store.transaction.transactionComplete
  );

  if (!transactionComplete && transactionInProgress) {
    return (
      <div className={"loading-spinner"}>
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return <></>;
};

// Todo: show live status of transaction
const TransactionResultModal = (props) => {
  let dispatch = useDispatch();
  let transactionInProgress = useSelector(
    (store) => store.transaction.transactionInProgress
  );
  let transactionComplete = useSelector(
    (store) => store.transaction.transactionComplete
  );
  let transactionSignature = useSelector(
    (store) => store.transaction.transactionSignature
  );
  if (
    !transactionInProgress &&
    transactionComplete &&
    transactionSignature !== null
  ) {
    // set the same class as wallet-provider-modal b/c of same properties
    return (
      <div className={"wallet-provider-overlay"}>
        <div className={"transaction-status-modal wallet-provider-modal"}>
          <span className={"transactionSignature"}>
            Signature: {transactionSignature}
          </span>
          <Close
            className={"transaction-result-modal-close "}
            style={{ fontSize: 40 }}
            onClick={() => dispatch(resetTransaction())}
          />
        </div>
      </div>
    );
  }
  return <></>;
};
const UniversityPage = () => {
  const isConnected = useSelector((store) => store.auth.is_connected);
  if (!isConnected) {
    let history = useHistory();
    history.push("/login");
  }
  const publicKey = useSelector((store) => store.auth.wallet._publicKey);
  console.log(publicKey.toString());
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar />
      <section className="hero is-danger">
        <div className="hero-body">
          <p className="title">Dashboard</p>
          <p className="subtitle">{publicKey.toString()}</p>
        </div>
      </section>
      <section className="py-1">
        <nav className="navbar">
          <div className="navbar-item">
            <button
              className="button is-success is-light"
              onClick={() => dispatch(requestAirdrop)}
            >
              <span className="icon">
                <i className="fas fa-coins"></i>
              </span>
              <span>Request Airdrop</span>
            </button>
          </div>
          <div className="navbar-item">
            <button
              className="button is-info is-light is-outlined"
              onClick={() => dispatch(requestAirdrop)}
            >
              <span className="icon">
                <i className="fas fa-sync"></i>
              </span>
              <span>Refresh Data</span>
            </button>
          </div>
        </nav>
      </section>
      <section className="py-6">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Balance</p>
              <p className="title">3,456 Sol</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Total Courses</p>
              <p className="title">123</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Total Students</p>
              <p className="title">456K</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Total Credentials Issued</p>
              <p className="title">789</p>
            </div>
          </div>
        </nav>
      </section>
      <section></section>
      <Footer />
    </div>
  );
};

export default UniversityPage;
