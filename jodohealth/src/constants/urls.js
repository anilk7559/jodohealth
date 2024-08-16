
// export const BASE_URL = "http://192.168.29.104:4000/";
// export const BASE_URL = "https://empowerhealth-backend.onrender.com/";
export const BASE_URL = "http://82.112.236.2:5000/";

export const LOGIN_API = "api/v1/login";
export const RIGISTERATIONS_API = "api/auth/register-login";
export const RIGISTERATIONS_API_OTP = "api/auth/verify-otp";
export const PUBLIC_KEY = "";
export const FORGOTPASS_API = "api/auth/forgot_password";
export const OTP_VERIFY_API = "api/auth/verify-email-otp";
export const RESET_PASS_API = "api/auth/reset_password";
export const ACCOUNT_DETAILS = "api/getProfile";
export const ACCOUNT_UPDATE = "api/compleate-profile";
export const UPLOAD_IMAGE = "";
export const LOGOUT_USER = "";
//change password
export const CHANGE_PASSWORDS = "api/changePassword";

//Admin 
export  const LOGIN_ADMIN ="api/auth/login"
export  const GET_ALL_LABS_BOOKING_LISTS ="api/appointment/all-list"
export  const UPDATE_STATUS ="api/appointment/update/status"

// export  const LOGIN_ADMIN ="api/v1/admin/login"

//Agency
export  const LOGIN_AGENCY ="api/auth/login"
export  const GET_AGENCY_ACCOUNT_LIST ="api/agency/all-list"
export  const CREATE_AGENCY_ACCOUNT ="api/agency/create-account"
export  const GET_ONE_AGENCY_ACCOUNT ="api/agency/list"
export  const UPDATE_ONE_AGENCY_ACCOUNT ="api/agency/update"
export  const CHANGE_ONE_AGENCY_ACCOUNT_PASSWORD ="api/agency/newPassword"
export  const DELETE_ONE_AGENCY_ACCOUNT ="api/agency/deactivate"

//Labs
export  const LOGIN_LAB ="api/auth/login"
export  const GET_LAB_LIST ="api/auth/user/lab/list"
export  const GET_LAB_LIST_USING_AUTH ="api/lab/all-list"
export  const GET_LAB_ACCOUNT_LIST ="api/lab/all-list"
export  const CREATE_LAB_ACCOUNT ="api/lab/create-account"
export  const GET_ONE_LAB_ACCOUNT ="api/lab/list"
export  const UPDATE_ONE_LAB_ACCOUNT ="api/lab/update"
export  const CHANGE_ONE_LAB_ACCOUNT_PASSWORD ="api/lab/newPassword"
export  const DELETE_ONE_LAB_ACCOUNT ="api/lab/deactivate"
export  const UPDATE_APPOINTMENT ="api/appointment/update"

//users
export  const MAKE_SUBSCRIPTION ="api/user/subscription"
export  const GET_MEMBERS ="api/user/subscription/member"
export  const MAKE_APPOINTMENT ="api/user/create-appointment"
export  const GET_USERS ="api/user/all-list"
export  const UPDATE_SUBSCRIPTION ="api/user/subscription/status"


//excel sheets
export  const GET_DASHBOARD_DATA ="api/dashboard"



























































// satyam api's


// export  const GET_AGENCY_ACCOUNT_LIST ="api/v1/admin/agencies"
// export  const CREATE_AGENCY_ACCOUNT ="api/v1/admin/agency/register"
// export  const GET_ONE_AGENCY_ACCOUNT ="api/v1/admin/agency"
// export  const UPDATE_ONE_AGENCY_ACCOUNT ="api/v1/admin/agency"
// export  const CHANGE_ONE_AGENCY_ACCOUNT_PASSWORD ="api/v1/agency/changepassword"
// export  const DELETE_ONE_AGENCY_ACCOUNT ="api/v1/admin/agency"

// export  const GET_LAB_LIST ="api/v1/lab"
// export  const GET_LAB_LIST_USING_AUTH ="api/v1/labs"
// export  const GET_LAB_ACCOUNT_LIST ="api/v1/admin/agencies"
// export  const CREATE_LAB_ACCOUNT ="api/v1/lab/register"
// export  const GET_ONE_LAB_ACCOUNT ="api/v1/admin/agency"
// export  const UPDATE_ONE_LAB_ACCOUNT ="api/v1/admin/agency"
// export  const CHANGE_ONE_LAB_ACCOUNT_PASSWORD ="api/v1/agency/changepassword"
// export  const DELETE_ONE_LAB_ACCOUNT ="api/v1/admin/agency"