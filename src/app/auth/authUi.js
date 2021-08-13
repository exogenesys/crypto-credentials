import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import {useSelector, connect} from "react-redux";
import {startConnection} from "./authService";
import {useStore} from "react-redux";
import {clusterApiUrl, Connection, SystemProgram, Transaction} from "@solana/web3.js";
import Wallet from '@project-serum/sol-wallet-adapter'
import {TransactionPage} from "../transaction/transactionUi";
import {useHistory} from "react-router";


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



