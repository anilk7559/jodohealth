import { OPERATE_DASHBOARD_ERROR, OPERATE_DASHBOARD_LOADING, OPERATE_DASHBOARD_SUCCESS } from "../../constants/otherActionTypes/Dashboard";


export const operateDashboardLoading = (isLoading) => ({
    type: OPERATE_DASHBOARD_LOADING,
    isLoading: isLoading,
});

export const operateDashboardSuccess = (isLoading) => ({
    type: OPERATE_DASHBOARD_SUCCESS,
    isLoading: isLoading,
});

export const operateDashboardError = (isLoading) => ({
    type: OPERATE_DASHBOARD_ERROR,
    isLoading: isLoading,
});
