
import * as url from "../../../constants/urls";
import * as Service from "../../../constants/service";
import { operateUsersError, operateUsersLoading, operateUsersSuccess } from "../../actions/otherActions/Users";
import { getData, storageKey } from "../../../constants/storage";


export const makeSubscription = async (body) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateUsersLoading(true);
    const response = await Service.post(url.MAKE_SUBSCRIPTION,token,body);
  
    if (response.code == 200) {

      operateUsersSuccess(true);
      console.log(response,"responseresponseresponseresponse");
      return { success: true, response }; 
    } else {
      operateUsersError(true);
      return { success: false, error: response.error_message }; 
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateUsersError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateUsersLoading(false);
  }
};

export const makeAppointment = async (formdata) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateUsersLoading(true);
    const response = await Service.uploadImageApi(url.MAKE_APPOINTMENT,token,formdata);
  
    if (response.code == 200) {

      operateUsersSuccess(true);
      console.log(response,"responseresponseresponseresponse");
      return { success: true, response }; 
    } else {
      operateUsersError(true);
      return { success: false, error: response.error_message }; 
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateUsersError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateUsersLoading(false);
  }
};
export const getMemberlist = async () => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateUsersLoading(true);
    const response = await Service.get(url.GET_MEMBERS,token);
  
    if (response.code == 200) {

      operateUsersSuccess(true);
      console.log(response,"responseresponseresponseresponse");
      return { success: true, response }; 
    } else {
      operateUsersError(true);
      return { success: false, error: response.error_message }; 
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateUsersError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateUsersLoading(false);
  }
};

export const getalllabsbookinglist = async (page,query) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateUsersLoading(true);
    const response = await Service.get(`${url.GET_ALL_LABS_BOOKING_LISTS}?page=${page + 1}&limit=10&search=${query}`,token);
    
    if (response.code == 200) {

      operateUsersSuccess(true);
      console.log(response,"responseresponseresponseresponse");
      return { success: true, response }; 
    } else {
      operateUsersError(true);
      return { success: false, error: response.error_message }; 
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateUsersError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateUsersLoading(false);
  }
};

export const appointmentupdate = async (body ,id) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateUsersLoading(true);
    const response = await Service.uploadImageApi(`${url.UPDATE_APPOINTMENT}?appointment_id=${id}`,token,body);
    if (response.code === 200) {

      operateUsersSuccess(true);
      return { success: true, response }; 
    } else {
      operateUsersError(true);
      return { success: false, error: response.error_message }; 
    }
  } catch (error) {
    console.error("Error in UPDATE_ONE_LAB_ACCOUNT:", error);
    operateUsersError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateUsersLoading(false);
  }
};

export const getalluserlistforsubscription = async (page,query) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateUsersLoading(true);
    const response = await Service.get(`${url.GET_USERS}?page=${page + 1}&limit=10&search=${query}`,token);
    
    if (response.code == 200) {

      operateUsersSuccess(true);
      console.log(response,"responseresponseresponseresponse");
      return { success: true, response }; 
    } else {
      operateUsersError(true);
      return { success: false, error: response.error_message }; 
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateUsersError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateUsersLoading(false);
  }
};

export const updateSubscriptionStatus = async (id,body) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateUsersLoading(true);
    const response = await Service.post(`${url.UPDATE_SUBSCRIPTION}?user_id=${id}`,token,body);
    if (response.code === 200) {

      operateUsersSuccess(true);
      return { success: true, response }; 
    } else {
      operateUsersError(true);
      return { success: false, error: response.error_message }; 
    }
  } catch (error) {
    console.error("Error in UPDATE_ONE_AGENCY_ACCOUNT:", error);
    operateUsersError(true);
    return { success: false, error: "An error occurred" }; 
  } finally {
    operateUsersLoading(false);
  }
};