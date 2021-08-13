import React from 'react';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector, useStore} from "react-redux";
import {startConnection} from "./authService";
import {TransactionPage} from "../transaction/transactionUi";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {connectionSetup, connectionStart} from "./actions";

const wallet_providers = ["https://www.sollet.io",
         "https://solflare.com/access-wallet",
         "https://www.ledger.com",
         "https://www.solong.com",
         "https://www.mathwallet.org",
         "https://www.phantom.app",
];
export default function AuthRedirect () {
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
            <TransactionPage />
        )
    }
    return (
        <div>
            <br />
            <Button variant="contained" color="primary" disableElevation onClick={ handleConnect}>
                Connect Wallet
            </Button>
            <WalletProviderModal selectedValue={selectedValue} open={open} onClose={handleClose}  />
        </div>

    )
}


function WalletProviderModal(props) {
    const { onClose, selectedValue, open } = props;
    const dispatch = useDispatch()
    const handleClose = () => {
        onClose(selectedValue);
    };

    function handleConnect(provider) {
        console.log(provider)
        dispatch(connectionSetup(provider))
        dispatch(startConnection)
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="walletprovider-dialog-title" open={open}>
            <DialogTitle id="walletprovider-dialog-title">Set backup account</DialogTitle>
            <List>
                {wallet_providers.map((provider, url) => (
                    <ListItem button onClick={() => handleConnect(this)} key={provider}>
                        <ListItemText primary={provider} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );

    WalletProviderModal.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired,
    };
}



