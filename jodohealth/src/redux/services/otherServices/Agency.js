import * as url from "../../../constants/urls";
import * as Service from "../../../constants/service";
import { operateAgencyError, operateAgencyLoading, operateAgencySuccess } from "../../actions/otherActions/Agency";
import { getData, storageKey } from "../../../constants/storage";


export const GetAgenyAccountLists = async (page,query) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateAgencyLoading(true);
    const response = await Service.get(`${url.GET_AGENCY_ACCOUNT_LIST}?page=${page + 1}&limit=10&search=${query} `,token);
    if (response.code == 200) {

      operateAgencySuccess(true);
      return { success: true, response }; 
    } else {
      operateAgencyError(true);
      return { success: false, error: "get data failed" }; 
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateAgencyError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateAgencyLoading(false);
  }
};

export const CreateAgenyAccount = async (body) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateAgencyLoading(true);
    const response = await Service.uploadImageApi(url.CREATE_AGENCY_ACCOUNT,token,body);
    if (response.code == 200) {

      operateAgencySuccess(true);
      return { success: true, response }; 
    } else {
      operateAgencyError(true);
      return { success: false, error: response.error_message }; 
    }
  } catch (error) {
    console.error("Error in CREATE_AGENCY_ACCOUNT:", error);
    operateAgencyError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateAgencyLoading(false);
  }
};
export const GetOneAgenyAccount= async (id) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateAgencyLoading(true);
    const response = await Service.get(`${url.GET_ONE_AGENCY_ACCOUNT}?agenctId=${id}`,token);
    if (response.code == 200) {

      operateAgencySuccess(true);
      return { success: true, response }; 
    } else {
      operateAgencyError(true);
      return { success: false, error: "get data failed" }; 
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateAgencyError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateAgencyLoading(false);
  }
};
export const UpdateAgenyAccount = async (body ,id) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateAgencyLoading(true);
    const response = await Service.uploadImageApi(`${url.UPDATE_ONE_AGENCY_ACCOUNT}?agencyId=${id}`,token,body);
    if (response.code === 200) {

      operateAgencySuccess(true);
      return { success: true, response }; 
    } else {
      operateAgencyError(true);
      return { success: false, error: response.error_message }; 
    }
  } catch (error) {
    console.error("Error in UPDATE_ONE_AGENCY_ACCOUNT:", error);
    operateAgencyError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateAgencyLoading(false);
  }
};
export const ChangeAgenyAccountpassword = async (body,id) => {
console.log(body,"i am body function");
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateAgencyLoading(true);
    const response = await Service.post(`${url.CHANGE_ONE_AGENCY_ACCOUNT_PASSWORD}?agencyId=${id}`,token,body);
    if (response.code  === 200) {

      operateAgencySuccess(true);
      return { success: true, response }; 
    } else {
      operateAgencyError(true);
      return { success: false, error:  response.error_message }; 
    }
  } catch (error) {
    console.error("Error in CHANGE_ONE_AGENCY_ACCOUNT_PASSWORD:", error);
    operateAgencyError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateAgencyLoading(false);
  }
};
export const DeleteAgenyAccountpassword= async (id) => {
    const token = getData(storageKey.AUTH_TOKEN);
    try {
      operateAgencyLoading(true);
      const response = await Service.get(`${url.DELETE_ONE_AGENCY_ACCOUNT}?agencyId=${id}`,token);
      if (response.code === 200) {
  
        operateAgencySuccess(true);
        return { success: true, response }; 
      } else {
        operateAgencyError(true);
        return { success: false, error:response.error_message  }; 
      }
    } catch (error) {
      console.error("Error in DELETE_ONE_AGENCY_ACCOUNT:", error);
      operateAgencyError(true);
      return { success: false, error: "An error occurred" }; 
    } finally {
      operateAgencyLoading(false);
    }
  };

