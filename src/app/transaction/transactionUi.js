import React from "react";
import {Button, FormControl, Input, InputLabel, Typography} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {setupTransaction} from "./actions";
import {doTransfer} from "./transactionService";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormGroup from "@material-ui/core/FormGroup";

export const TransactionPage = () => {
    let dispatch = useDispatch();
    const transferClicked = () => {
        let targetAddress = document.getElementById("token-reciever-input").value
        let transferAmount = document.getElementById("token-amount-input").value

        dispatch(setupTransaction({
            targetAddress: targetAddress,
            transferAmount: transferAmount
        }))

        dispatch(doTransfer)
    }


    return (
        <div className={"transfer-container center"}>
            <h1>Transfer XEN Tokens</h1>
            <FormGroup>
                <FormControl>
                    <InputLabel htmlFor="token-rec-addr">Token Reciever Address</InputLabel>
                    <Input name={"token-rec-addr"} className="input-basic" id={"token-reciever-input"}
                           label="Address" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="token-transfer-amount">Transfer Amount</InputLabel>
                    <Input name="token-transfer-amount" className="input-basic" type={"number"}
                           id={"token-amount-input"} label="Amount" />
                </FormControl>
            </FormGroup>

            <Button onClick={transferClicked} disableElevation={true} variant={"contained"} size={"large"}
                    color={"primary"}>Transfer</Button>
            <TransactionResult/>

        </div>


    )
}

const TransactionResult = (props) => {
    let transactionInfo = useSelector(store => store.transaction.transactionInfo)
    if (!transactionInfo || transactionInfo.length < 1) {
        return (<></>)
    }

    return (
        <List>
            {Object.entries(transactionInfo).map((infoName, info) => {
                return (<ListItem key={infoName}>
                    <Typography>
                        {infoName[0]}: {infoName[1]}
                    </Typography>
                </ListItem>)
            })}

        </List>
    )
}