import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import { startConnection } from "./authService";
import { TransactionPage } from "../transaction/transactionUi";
import { connectionSetup } from "./actions";
import Routes from "../routes";

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
export default function AuthPage() {
  const {dispatch} = useStore();

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

  const isConnected = useSelector((state) => state.auth.is_connected);
  if (isConnected) {
    const history = useHistory();
    history.push(Routes.init.path);
  }
  return (
    <div>
      <Navbar />
      <section className="hero is-warning is-bold is-large">
        <div className="hero-body">
          <h1 className="title is-1">
            Welcome To{" "}
            <span className=" is-underlined">Crypto Credentials</span> 🎓
          </h1>
          <p>
            <button
              className="button is-medium is-rounded"
              onClick={() => setOpen(true)}
            >
              <span className="icon">
                <i className="fas fa-wallet" />
              </span>
              <span>Connect Wallet</span>
            </button>
          </p>
        </div>
      </section>
      <WalletProviderModal
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
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
        <div className="modal-background" onClick={() => handleClose()} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Select Wallet Provider</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => handleClose()}
             />
          </header>
          <section className="modal-card-body">
            {wallet_providers.map((provider, url) => (
              <button
                className="button is-fullwidth is-dark is-outlined is-rounded is-medium my-1"
                onClick={() => handleConnect(provider)}
                key={provider.url}
              >
                {provider.name}
              </button>
            ))}
          </section>
          <footer className="modal-card-foot" />
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
