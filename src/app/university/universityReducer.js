import { transactionActions, POLLING_STATUS } from "./actions";
import { updateObject } from "../util";

const initialState = {
  randomSeed: Math.floor(Math.random() * 255),
  universityAccountStatus: false,
  universityFormData: {
    name: "",
  },
  balance: 0,
  numberOfCourses: 0,
  numberOfStudents: 0,
  numberOfCredentials: 0,
  accountPollingStatus: POLLING_STATUS.DEFAULT,
  accountPollingCount: 0,
  program: null,
  provider: null,
  profile: null,
  newCredentialData: null,
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
    case transactionActions.INCREMENT_ACCOUNT_POLLING_COUNT: {
      return updateObject(state, {
        accountPollingCount: state.accountPollingCount + 1,
      });
    }
    case transactionActions.RESET_ACCOUNT_POLLING_COUNT: {
      return updateObject(state, {
        accountPollingCount: 0,
      });
    }
    case transactionActions.UPDATE_ACCOUNT_POLLING_STATUS: {
      return updateObject(state, {
        accountPollingStatus: action.payload.status,
      });
    }
    case transactionActions.DISCONNECT_START: {
      return updateObject(state, initialState);
    }

    case transactionActions.UPDATE_UNIVERSITY_FORM_DATA: {
      return updateObject(state, {
        universityFormData: action.payload,
      });
    }
    case transactionActions.SET_UNIVERSITY_ACCOUNT_STATUS: {
      return updateObject(state, {
        universityAccountStatus: action.payload.universityAccountStatus,
      });
    }
    case transactionActions.STORE_NEW_CREDENTIAL_DATA: {
      return updateObject(state, {
        newCredentialData: action.payload.newCredentialData,
      });
    }
    case transactionActions.LOAD_UNIVERSITY_DATA: {
      return updateObject(state, {
        profile: action.payload.profile,
        universityAccountKey: action.payload.universityAccountKey,
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
