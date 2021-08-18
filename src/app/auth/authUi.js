import React from 'react';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector, useStore} from "react-redux";
import {startConnection} from "./authService";
import {TransactionPage} from "../transaction/transactionUi";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import {connectionSetup} from "./actions";

const wallet_providers = [
    {
        name: "Sollet",
        url: "https://www.sollet.io",
        icon: ""

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
        icon: ""
    },
    {
        url: "https://www.phantom.app",
        name: "Phantom",
        icon: ""
    },
];
export default function AuthRedirect() {
    let dispatch = useStore().dispatch

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(wallet_providers[1]);

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    function handleConnect(provider) {
        dispatch(startConnection)
    }

    function forceRerender() {
        this.forceUpdate()
    }

    let isConnected = useSelector(state => state.auth.is_connected)
    if (isConnected) {
        return (
            <TransactionPage/>
        )
    }
    return (
        <div className={"center"}>
            <Button variant="contained" color="primary" disableElevation onClick={() => setOpen(true)}>
                Connect Wallet
            </Button>
            <WalletProviderModal selectedValue={selectedValue} open={open} onClose={handleClose}/>
        </div>


    )
}


function WalletProviderModal(props) {
    const {onClose, selectedValue, open} = props;
    const dispatch = useDispatch()
    const handleClose = () => {
        onClose(selectedValue);
    };

    function handleConnect(provider) {
        dispatch(connectionSetup(provider))
        dispatch(startConnection)
    }
    WalletProviderModal.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired,
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="walletprovider-dialog-title" open={open}>
            <DialogTitle id="walletprovider-dialog-title">Select Wallet Provider</DialogTitle>
            <List>
                {wallet_providers.map((provider, url) => (
                    <Button className="choose-wallet-btn" color="secondary" variant={"outlined"}
                            onClick={() => handleConnect(provider)} key={provider.url}>
                        {provider.name}
                    </Button>
                ))}
            </List>
        </Dialog>
    );


}



