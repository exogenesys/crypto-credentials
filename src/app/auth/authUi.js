import React from 'react';
import {Button} from "@material-ui/core";
import {useSelector, useStore} from "react-redux";
import {startConnection} from "./authService";
import {TransactionPage} from "../transaction/transactionUi";


export default function AuthRedirect () {
    let dispatch = useStore().dispatch

    function handleConnect() {
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
            <Button variant="contained" color="primary" disableElevation onClick={ handleConnect}>
            Connect Wallet
            </Button>
    )
}



