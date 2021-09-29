import { transactionActions } from "./actions";
import { updateObject } from "../util";

const initialState = {
  program: null,
  provider: null,
  isAppInitialized: false,
};

export default function UniversityReducer(state = initialState, action) {
  switch (action.type) {
    case transactionActions.DISCONNECT_START: {
      return updateObject(state, initialState);
    }
    case transactionActions.INIT_PROGRAM: {
      return updateObject(state, {
        program: action.payload.program,
        provider: action.payload.provider,
        isAppInitialized: true,
      });
    }

    default:
      return state;
  }
}
