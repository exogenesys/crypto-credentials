export const authActions = {
  CONNECT_START: "CONNECT_START",
  CONNECT_SUCCESS: "CONNECT_SUCCESS",
  DISCONNECT_START: "DISCONNECT_START",
  DISCONNECT_SUCCESS: "DISCONNECT_SUCCESS",
  CONNECT_SETUP: "CONNECT_SETUP",
  CONNECT_ERROR: "CONNECT_ERROR",
};

export const connectionStart = (payload) => ({ type: authActions.CONNECT_START, payload });

export const connectionSuccess = (payload) => ({
    type: authActions.CONNECT_SUCCESS,
    payload,
  });

export const disconnectStart = (payload) => ({ type: authActions.DISCONNECT_START, payload });

export const disconnectSuccess = (payload) => ({
    type: authActions.DISCONNECT_SUCCESS,
    payload,
  });

export const connectionSetup = (payload) => ({
    type: authActions.CONNECT_SETUP,
    payload,
  });

export const connectionError = (payload) => ({
    type: authActions.CONNECT_ERROR,
    payload,
  });
