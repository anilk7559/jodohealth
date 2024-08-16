
import * as url from "../../../constants/urls";
import * as Service from "../../../constants/service";
import { operateLabError, operateLabLoading, operateLabSuccess } from "../../actions/otherActions/Lab";
import { getData, storageKey } from "../../../constants/storage";


export const Getlablist = async () => {
  try {
    operateLabLoading(true);
    const response = await Service.get(url.GET_LAB_LIST);
    if (response.code == 200) {

      operateLabSuccess(true);
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};
export const Getlablistwithauth = async () => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateLabLoading(true);
    const response = await Service.get(url.GET_LAB_LIST_USING_AUTH, token);
    if (response.code == 200) {

      operateLabSuccess(true);
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};

export const Getlablists = async (page, query) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateLabLoading(true);
    const response = await Service.get(`${url.GET_LAB_ACCOUNT_LIST}?page=${page + 1}&limit=10&search=${query} `, token);
    if (response.code == 200) {

      operateLabSuccess(true);
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};

export const CreateLabsAccount = async (body) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateLabLoading(true);
    const response = await Service.uploadImageApi(url.CREATE_LAB_ACCOUNT, token, body);
    if (response.code == 200) {

      operateLabSuccess(true);
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in CREATE_LAB_ACCOUNT:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};
export const GetOneLabsAccount = async (id) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateLabLoading(true);
    const response = await Service.get(`${url.GET_ONE_LAB_ACCOUNT}?labId=${id}`, token);
    if (response.code === 200) {

      operateLabSuccess(true);
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};
export const UpdateLabsAccount = async (body, id) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateLabLoading(true);
    const response = await Service.uploadImageApi(`${url.UPDATE_ONE_LAB_ACCOUNT}?labId=${id}`, token, body);
    if (response.code === 200) {

      operateLabSuccess(true);
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in UPDATE_ONE_LAB_ACCOUNT:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};
export const ChangeLabsAccountpassword = async (body, id) => {
  console.log(body, "i am body function");
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateLabLoading(true);
    const response = await Service.post(`${url.CHANGE_ONE_LAB_ACCOUNT_PASSWORD}?labId=${id}`, token, body);
    if (response.code === 200) {

      operateLabSuccess(true);
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in CHANGE_ONE_LAB_ACCOUNT_PASSWORD:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};
export const DeleteLabsAccountpassword = async (id) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateLabLoading(true);
    const response = await Service.get(`${url.DELETE_ONE_LAB_ACCOUNT}?labId=${id}`, token);
    if (response.code === 200) {

      operateLabSuccess(true);
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in DELETE_ONE_LAB_ACCOUNT:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};

export const getalllabsbookinglist = async (page, query) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateLabLoading(true);
    const response = await Service.get(`${url.GET_ALL_LABS_BOOKING_LISTS}?page=${page + 1}&limit=10&search=${query}`, token);

    if (response.code == 200) {

      operateLabSuccess(true);
      console.log(response, "responseresponseresponseresponse");
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};

export const updateStatus = async (body, id) => {

  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateLabLoading(true);
    const response = await Service.post(`${url.UPDATE_STATUS}?appointment_id=${id}`, token, body);
    if (response.code === 200) {

      operateLabSuccess(true);
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in UPDATE_ONE_LAB_ACCOUNT:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};
export const appointmentupdate = async (body, id) => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateLabLoading(true);
    const response = await Service.uploadImageApi(`${url.UPDATE_APPOINTMENT}?appointment_id=${id}`, token, body);
    if (response.code === 200) {

      operateLabSuccess(true);
      return { success: true, response };
    } else {
      operateLabError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in UPDATE_ONE_LAB_ACCOUNT:", error);
    operateLabError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateLabLoading(false);
  }
};