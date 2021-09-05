import { transactionActions } from "./actions";
import { updateObject } from "../util";

const initialState = {
  balance: 0,
  numberOfCourses: 0,
  numberOfStudents: 0,
  numberOfCredentials: 0,
  program: null,
  provider: null,
  profile: null,
  transactionInProgress: false,
  transactionComplete: false,
  transaction: null,
  transactionSetup: false,
  targetAddress: null,
  transferAmount: 0,
  transactionInfo: {},
  transactionError: null,
  isError: false,
  prevTransactionError: null,
  transactionSignature: null,
};

export default function UniversityReducer(state = initialState, action) {
  switch (action.type) {
    case transactionActions.LOAD_UNIVERSITY_DATA: {
      return updateObject(state, {
        profile: action.payload.profile,
      });
    }

    case transactionActions.INIT_PROGRAM: {
      return updateObject(state, {
        program: action.payload.program,
        provider: action.payload.provider,
      });
    }

    case transactionActions.UPDATE_BALANCE: {
      const formattedBalance = (
        action.payload.balance /
        (1000 * 1000 * 1000)
      ).toFixed(2);
      return updateObject(state, {
        balance: formattedBalance,
      });
    }

    case transactionActions.TRANSACTION_SETUP: {
      return updateObject(state, {
        transactionSetup: true,
        targetAddress: action.payload.targetAddress,
        transferAmount: action.payload.transferAmount,
        transactionComplete: false,
      });
    }

    case transactionActions.TRANSACTION_START: {
      return updateObject(state, {
        transactionInProgress: true,
      });
    }

    case transactionActions.TRANSACTION_END: {
      return updateObject(state, {
        transactionComplete: true,
        transactionInProgress: false,
        transactionSignature: action.payload.signature,
      });
    }

    case transactionActions.ADD_TX_INFO: {
      return updateObject(state, {
        transactionInfo: action.payload,
      });
    }

    case transactionActions.TRANSACTION_ERROR: {
      return updateObject(state, {
        transactionError: action.payload,
        isError: true,
        transactionInProgress: false,
      });
    }

    case transactionActions.TRANSACTION_RESET: {
      return updateObject(state, {
        transactionInProgress: false,
        transactionComplete: false,
        transaction: null,
        transactionSetup: false,
        targetAddress: null,
        transferAmount: 0,
        transactionInfo: {},
        transactionError: null,
        prevTransactionError: null,
        isError: false,
      });
    }

    case transactionActions.TRANSACTION_ERROR_RESET: {
      return updateObject(state, {
        isError: false,
        prevTransactionError: state.transactionError,
        transactionError: null,
      });
    }

    default:
      return state;
  }
}
