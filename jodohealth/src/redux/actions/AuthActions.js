import {
  PUBLIC_KEY_ERROR,
  PUBLIC_KEY_LOADING,
  PUBLIC_KEY_SUCCESS,
  USER_ACCOUNT_DETAILS_ERROR,
  USER_ACCOUNT_DETAILS_LOADING,
  USER_ACCOUNT_DETAILS_SUCCESS,
  USER_ACCOUNT_UPDATE_ERROR,
  USER_ACCOUNT_UPDATE_LOADING,
  USER_ACCOUNT_UPDATE_SUCCESS,
  USER_FORGOTPASS_ERROR,
  USER_FORGOTPASS_LOADING,
  USER_FORGOTPASS_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_LOADING,
  USER_LOGOUT_SUCCESS,
  USER_OTPVERIFY_ERROR,
  USER_OTPVERIFY_LOADING,
  USER_OTPVERIFY_SUCCESS,
  USER_RESET_PASSWORD_ERROR,
  USER_RESET_PASSWORD_LOADING,
  USER_RESET_PASSWORD_SUCCESS,
} from "../constants/AuthActionTypes";

export const userLoginLoading = (isLoading) => ({
  type: USER_LOGIN_LOADING,
  isLoading: isLoading,
});

export const userLoginSuccess = (isLoading) => ({
  type: USER_LOGIN_SUCCESS,
  isLoading: isLoading,
});

export const userLoginError = (isLoading) => ({
  type: USER_LOGIN_ERROR,
  isLoading: isLoading,
});
export const userForgotPassLoading = (isLoading) => ({
  type: USER_FORGOTPASS_LOADING,
  isLoading: isLoading,
});

export const userForgotPassSuccess = (isLoading) => ({
  type: USER_FORGOTPASS_SUCCESS,
  isLoading: isLoading,
});

export const userForgotPassError = (isLoading) => ({
  type: USER_FORGOTPASS_ERROR,
  isLoading: isLoading,
});
export const userOtpVerifyLoading = (isLoading) => ({
  type: USER_OTPVERIFY_LOADING,
  isLoading: isLoading,
});

export const userOtpVerifySuccess = (isLoading) => ({
  type: USER_OTPVERIFY_SUCCESS,
  isLoading: isLoading,
});

export const userOtpVerifyError = (isLoading) => ({
  type: USER_OTPVERIFY_ERROR,
  isLoading: isLoading,
});

export const userResetPassLoading = (isLoading) => ({
  type: USER_RESET_PASSWORD_LOADING,
  isLoading: isLoading,
});

export const userResetPassSuccess = (isLoading) => ({
  type: USER_RESET_PASSWORD_SUCCESS,
  isLoading: isLoading,
});

export const userResetPassError = (isLoading) => ({
  type: USER_RESET_PASSWORD_ERROR,
  isLoading: isLoading,
});

export const userAccountDetailsLoading = (isLoading) => ({
  type: USER_ACCOUNT_DETAILS_LOADING,
  isLoading: isLoading,
});

export const userAccountDetailsSuccess = (isLoading) => ({
  type: USER_ACCOUNT_DETAILS_SUCCESS,
  isLoading: isLoading,
});

export const userAccountDetailsError = (isLoading) => ({
  type: USER_ACCOUNT_DETAILS_ERROR,
  isLoading: isLoading,
});

export const userAccountUpdateLoading = (isLoading) => ({
  type: USER_ACCOUNT_UPDATE_LOADING,
  isLoading: isLoading,
});

export const userAccountUpdateSuccess = (isLoading, data) => {
  return {
    type: USER_ACCOUNT_UPDATE_SUCCESS,
    isLoading: isLoading,
    data: data,
  };
};

export const userAccountUpdateError = (isLoading) => ({
  type: USER_ACCOUNT_UPDATE_ERROR,
  isLoading: isLoading,
});
export const userLogoutLoading = (isLoading) => ({
  type: USER_LOGOUT_LOADING,
  isLoading: isLoading,
});

export const userLogoutSuccess = (isLoading) => {
  return {
    type: USER_LOGOUT_SUCCESS,
    isLoading: isLoading,
  };
};

export const userLogoutError = (isLoading) => ({
  type: USER_LOGOUT_ERROR,
  isLoading: isLoading,
});
export const publicKeyLoading = (isLoading) => ({
  type: PUBLIC_KEY_LOADING,
  isLoading: isLoading,
});

export const publicKeySuccess = (isLoading) => {
  return {
    type: PUBLIC_KEY_SUCCESS,
    isLoading: isLoading,
  };
};

export const publicKeyError = (isLoading) => ({
  type: PUBLIC_KEY_ERROR,
  isLoading: isLoading,
});
