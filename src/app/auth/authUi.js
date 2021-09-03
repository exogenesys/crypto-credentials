import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector, useStore } from "react-redux";
import { startConnection } from "./authService";
import { TransactionPage } from "../transaction/transactionUi";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import { connectionSetup } from "./actions";
import { Close } from "@material-ui/icons";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const wallet_providers = [
  {
    name: "Sollet",
    url: "https://www.sollet.io",
    icon: "",
  },
  /* {
         url:"https://solflare.com/access-wallet",
         name: "Solflare",
         icon: ""
     },
     {
         url: "https://www.ledger.com",
         name: "Ledger",
         icon: ""
     },
     {
         url: "https://www.solong.com",
         name: "Solong",
         icon: ""
     },
    */ {
    url: "https://www.mathwallet.org",
    name: "Mathwallet",
    icon: "",
  },
  {
    url: "https://www.phantom.app",
    name: "Phantom",
    icon: "",
  },
];
export default function AuthRedirect() {
  let dispatch = useStore().dispatch;

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(wallet_providers[1]);

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  function handleConnect(provider) {
    dispatch(startConnection);
  }

  function forceRerender() {
    this.forceUpdate();
  }

  let isConnected = useSelector((state) => state.auth.is_connected);
  if (isConnected) {
    return <TransactionPage />;
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <section className="section">
          <h1 className="title">
            {" "}
            Welcome to{" "}
            <a href="https://credentials.online">Credentials.Online!</a>
          </h1>
          <h2 className="subtitle">
            Get started by editing <code>pages/index.js</code>
          </h2>
          <div className={"center"}>
            <button
              className={"button is-medium is-rounded"}
              onClick={() => setOpen(true)}
            >
              <span className="icon">
                <i className="fas fa-wallet"></i>
              </span>
              <span>Connect Wallet</span>
            </button>
            <WalletProviderModal
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

function WalletProviderModal(props) {
  const { onClose, selectedValue, open } = props;
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose(selectedValue);
  };

  function handleConnect(provider) {
    dispatch(connectionSetup(provider));
    dispatch(startConnection);
  }
  return (
    <div>
      <div className={`modal ${open ? "is-active" : ""}`}>
        <div className="modal-background" onClick={() => handleClose()}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Select Wallet Provider</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => handleClose()}
            ></button>
          </header>
          <section className="modal-card-body">
            {wallet_providers.map((provider, url) => (
              <button
                className="button is-fullwidth is-medium my-1"
                onClick={() => handleConnect(provider)}
                key={provider.url}
              >
                {provider.name}
              </button>
            ))}
          </section>
          <footer className="modal-card-foot"></footer>
        </div>
      </div>
    </div>
  );

  return <></>;
  WalletProviderModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
}
