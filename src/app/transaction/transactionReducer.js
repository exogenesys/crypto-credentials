import {transactionActions} from "./actions";
import {updateObject} from '../util'

const initialState = {
    signer: null,
    transactionInProgress: false,
    transactionComplete: false,
    transaction: null,
    transactionSetup: false,
    targetAddress: null,
    transferAmount: 0,
    feePayer: [227, 139, 220, 233, 57, 200, 118, 150, 232, 169, 207, 228, 164, 29, 52, 137, 239, 88, 87, 85, 19, 156, 194, 178, 7, 54, 183, 144, 172, 114, 28, 158, 9, 157, 203, 244, 142, 196, 12, 52, 30, 111, 152, 101, 2, 120, 156, 11, 12, 54, 214, 6, 131, 18, 222, 139, 237, 9, 52, 229, 128, 208, 203, 84],
    transactionInfo: {}
}

export default function TransactionReducer(state = initialState, action) {
    switch (action.type) {

        case transactionActions.TRANSACTION_SETUP: {
            return updateObject(state, {
                transactionSetup: true,
                targetAddress: action.payload.targetAddress,
                transferAmount: action.payload.transferAmount
            })
        }

        case transactionActions.TRANSACTION_START: {
            return updateObject(state, {
                transactionInProgress: true,

            })
        }

        case transactionActions.ADD_TX_INFO: {
            return updateObject(state, {
                transactionInfo: updateObject(state.transactionInfo, action.payload)
            })
        }


        default:
            return state

    }
}

