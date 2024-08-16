import * as url from "../../constants/urls";
import * as Service from "../../constants/service";
import { getData, storageKey, storeData } from "../../constants/storage";
import {
  userAccountDetailsError,
  userAccountDetailsLoading,
  userAccountDetailsSuccess,
  userAccountUpdateError,
  userAccountUpdateLoading,
  userAccountUpdateSuccess,
  userForgotPassError,
  userForgotPassLoading,
  userForgotPassSuccess,
  userLoginError,
  userLoginLoading,
  userLoginSuccess,
  userOtpVerifyError,
  userOtpVerifyLoading,
  userOtpVerifySuccess,
  userResetPassError,
  userResetPassLoading,
  userResetPassSuccess,
} from "../actions/AuthActions";

export const userRigistered = async (body) => {
  try {
    userLoginLoading(true);
    const response = await Service.post(url.RIGISTERATIONS_API, "", body);
    if (response.code == 200) {
      userLoginSuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Login failed", "LOGIN_API-----------");
      userLoginError(true);
      return { success: false, error:response.error_message }; 
    }
  } catch (error) {
    console.error("Error in userLogin:", error);
    userLoginError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userLoginLoading(false);
  }
};
export const userRigisteredotp = async (body) => {
  try {
    userLoginLoading(true);
    const response = await Service.post(url.RIGISTERATIONS_API_OTP, "", body);
    if (response.code == 200) {
      storeData(storageKey.AUTH_TOKEN, response?.body?.token);
      storeData(storageKey.USER_DATA, JSON.stringify(response.body?.user));
      storeData(storageKey.USER_PHONE, response.body?.user?.phone);
      storeData(storageKey.USER_LOGIN, response.body?.user?.role_type);
      storeData(storageKey.SUBSCRIPTION, response.body?.user?.subscription_status);
      
      userLoginSuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Login failed", "LOGIN_API-----------");
      userLoginError(true);
      return { success: false, error:response.error_message }; 
    }
  } catch (error) {
    console.error("Error in userLogin:", error);
    userLoginError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userLoginLoading(false);
  }
};
export const userLogin = async (body) => {
  try {
    userLoginLoading(true);
    const response = await Service.post(url.LOGIN_API, "", body);
    if (response.success === true) {
      storeData(storageKey.AUTH_TOKEN, response.body.token);
      storeData(storageKey.USER_DATA, JSON.stringify(response.body));
      userLoginSuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Login failed", "LOGIN_API-----------");
      userLoginError(true);
      return { success: false, error: "Login failed" }; 
    }
  } catch (error) {
    console.error("Error in userLogin:", error);
    userLoginError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userLoginLoading(false);
  }
};

export const AdminLogin = async (body) => {
  try {
    userLoginLoading(true);
    const response = await Service.post(url.LOGIN_ADMIN,"", body);
    if (response.code == 200) {
      storeData(storageKey.AUTH_TOKEN, response.body.token);
      storeData(storageKey.USER_DATA, JSON.stringify(response.body.userDetail));
      userLoginSuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Login failed", "LOGIN_ADMIN-----------");
      userLoginError(true);
      return { success: false, error: "Login failed" }; 
    }
  } catch (error) {
    console.error("Error in AdminLogin:", error);
    userLoginError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userLoginLoading(false);
  }
};
export const AgencyLogin = async (body) => {
  try {
    userLoginLoading(true);
    const response = await Service.post(url.LOGIN_AGENCY,"", body);
    if (response.code == 200) {
      storeData(storageKey.AUTH_TOKEN, response.body.token);
      storeData(storageKey.USER_DATA, JSON.stringify(response.body.userDetail));
      userLoginSuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Login failed", "LOGIN_AGENCY-----------");
      userLoginError(true);
      return { success: false, error: "Login failed" }; 
    }
  } catch (error) {
    console.error("Error in AdminLogin:", error);
    userLoginError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userLoginLoading(false);
  }
};
export const LabLogin = async (body) => {
  try {
    userLoginLoading(true);
    const response = await Service.post(url.LOGIN_LAB,"", body);
    if (response.code == 200) {
      storeData(storageKey.AUTH_TOKEN, response.body.token);
      storeData(storageKey.USER_DATA, JSON.stringify(response.body.userDetail));
      userLoginSuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Login failed", "LOGIN_LAB-----------");
      userLoginError(true);
      return { success: false, error: "Login failed" }; 
    }
  } catch (error) {
    console.error("Error in AdminLogin:", error);
    userLoginError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userLoginLoading(false);
  }
};
export const getAccountDetails = async () => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    userAccountDetailsLoading(true)
    const response = await Service.get(url.ACCOUNT_DETAILS,token);
    if (response.code == 200) {

      userAccountDetailsSuccess(true);
      return { success: true, response }; 
    } else {
      userAccountDetailsError(true);
      return { success: false, error: response.error_message }; 
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    userAccountDetailsError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userAccountDetailsLoading(false)
  }
};


export const updateAccountDetails = async (body) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    userAccountUpdateLoading(true)
    const response = await Service.uploadImageApi(url.ACCOUNT_UPDATE, token, body)
    if (response.code == 200) {
      userAccountUpdateSuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Update failed", "ACCOUNT_UPDATE-----------");
      userAccountUpdateError(true);
      return { success: false, error:  response.error_message}; 
    }
  } catch (error) {
    console.error("Error in ACCOUNT_UPDATE:", error);
    userAccountUpdateError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userAccountUpdateLoading(true);
  }
};

export const handlechangepassword = async (body) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    userAccountUpdateLoading(true)
    const response = await Service.post(url.CHANGE_PASSWORDS, token, body)
    if (response.code == 200) {
      userAccountUpdateSuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Update failed", "CHANGE_PASSWORDS-----------");
      userAccountUpdateError(true);
      return { success: false, error:  response.error_message}; 
    }
  } catch (error) {
    console.error("Error in CHANGE_PASSWORDS:", error);
    userAccountUpdateError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userAccountUpdateLoading(true);
  }
};

export const forgotPassword = async (body) => {
  try {
    userForgotPassLoading(true)
    const response = await Service.post(url.FORGOTPASS_API,"", body)
    if (response.code == 200) {
      userForgotPassSuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Update failed", "FORGOTPASS_API-----------");
      userForgotPassError(true);
      return { success: false, error:  response.error_message}; 
    }
  } catch (error) {
    console.error("Error in FORGOTPASS_API:", error);
    userForgotPassError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userForgotPassLoading(true);
  }
};
export const otpVerify = async (body) => {
  try {
    userOtpVerifyLoading(true)
    const response = await Service.post(url.OTP_VERIFY_API,"", body)
    if (response.code == 200) {
      userOtpVerifySuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Update failed", "OTP_VERIFY_API-----------");
      userOtpVerifyError(true);
      return { success: false, error:  response.error_message}; 
    }
  } catch (error) {
    console.error("Error in OTP_VERIFY_API:", error);
    userOtpVerifyError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userOtpVerifyLoading(true);
  }
};
export const resetPassword = async (body) => {
  try {
    userResetPassLoading(true)
    const response = await Service.post(url.RESET_PASS_API,"", body)
    if (response.code == 200) {
      userResetPassSuccess(true);
      return { success: true, response }; 
    } else {
      console.log("Update failed", "RESET_PASS_API-----------");
      userResetPassError(true);
      return { success: false, error:  response.error_message}; 
    }
  } catch (error) {
    console.error("Error in RESET_PASS_API:", error);
    userResetPassError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    userResetPassLoading(true);
  }
};

// export const otpVerify = (body) => async (dispatch) => {
//   console.log("otpVerify body --", body);
//   dispatch(userOtpVerifyLoading(true));
//   try {
//     const response = await Service.post(url.OTP_VERIFY_API, "", body);
//     console.log("otpVerify response --", response);
//     if (response.code == 200) {
//       dispatch(userOtpVerifySuccess(false));
//       console.log(response, "Otp Verify----------");
//     }
//     return response;
//   } catch (error) {
//     console.log("otpVerify error --", error);
//     dispatch(userOtpVerifyError(false));
//     return { message: error };
//   }
// };
// export const resetPasswordApi = (body, token) => async (dispatch) => {
//   dispatch(userResetPassLoading(true));
//   const token = getData(storageKey?.AUTH_TOKEN);
//   try {
//     const response = await Service.post(url.CHANGE_PASSWORDS, token, body);
//     console.log("resetPasswordApi --", response);
//     dispatch(userResetPassSuccess(false));
//     return response;
//   } catch (error) {
//     console.log("resetPasswordApi error --", error);
//     dispatch(userResetPassError(false));
//     return { message: error };
//   }
// };




// export const handleLogoutUser = () => async (dispatch) => {
//   const token = getData(storageKey.AUTH_TOKEN);
//   dispatch(userLogoutLoading(true));
//   try {
//     const response = await Service.get(url.LOGOUT_USER, token);
//     console.log("Logouttt --", response);
//     dispatch(userLogoutSuccess(false));
//     return response;
//   } catch (error) {
//     console.log("Logout error --", error);
//     dispatch(userLogoutError(false));
//     return { message: error };
//   }
// };
// export const getPublicKey = () => async (dispatch) => {
//   const token = getData(storageKey.AUTH_TOKEN);
//   dispatch(publicKeyLoading(true));
//   try {
//     const response = await Service.get(url.PUBLIC_KEY, token);
//     console.log("getAccountDetails --", response);
//     dispatch(publicKeySuccess(false));
//     return response;
//   } catch (error) {
//     console.log("getAccountDetails error --", error);
//     dispatch(publicKeyError(false));
//     return { message: error };
//   }
// };
// export const resetPassword = (body) => async (dispatch) => {
//   dispatch(userResetPassLoading(true));

//   try {
//     const response = await Service.post(url.RESET_PASS_API,"", body);
//     console.log("resetPassword --", response);
//     dispatch(userResetPassSuccess(false));
//     return response;
//   } catch (error) {
//     console.log("resetPassword error --", error);
//     dispatch(userResetPassError(false));
//     return { message: error };
//   }
// };
