import { OPERATE_USERS_ERROR, OPERATE_USERS_LOADING, OPERATE_USERS_SUCCESS } from "../../constants/otherActionTypes/Users";

export const operateUsersLoading = (isLoading) => ({
    type: OPERATE_USERS_LOADING,
    isLoading: isLoading,
  });
  
  export const operateUsersSuccess = (isLoading) => ({
    type: OPERATE_USERS_SUCCESS,
    isLoading: isLoading,
  });
  
  export const operateUsersError = (isLoading) => ({
    type: OPERATE_USERS_ERROR,
    isLoading: isLoading,
  });
  