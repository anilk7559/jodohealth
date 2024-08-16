import { OPERATE_AGENCY_ERROR, OPERATE_AGENCY_LOADING, OPERATE_AGENCY_SUCCESS } from "../../constants/otherActionTypes/Agency";


export const operateAgencyLoading = (isLoading) => ({
    type: OPERATE_AGENCY_LOADING,
    isLoading: isLoading,
});

export const operateAgencySuccess = (isLoading) => ({
    type: OPERATE_AGENCY_SUCCESS,
    isLoading: isLoading,
});

export const operateAgencyError = (isLoading) => ({
    type: OPERATE_AGENCY_ERROR,
    isLoading: isLoading,
});
