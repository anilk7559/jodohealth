import {
  OPERATE_LAB_ERROR,
  OPERATE_LAB_LOADING,
  OPERATE_LAB_SUCCESS,
} from "../../constants/otherActionTypes/Lab";

export const operateLabLoading = (isLoading) => ({
  type: OPERATE_LAB_LOADING,
  isLoading: isLoading,
});

export const operateLabSuccess = (isLoading) => ({
  type: OPERATE_LAB_SUCCESS,
  isLoading: isLoading,
});

export const operateLabError = (isLoading) => ({
  type: OPERATE_LAB_ERROR,
  isLoading: isLoading,
});
