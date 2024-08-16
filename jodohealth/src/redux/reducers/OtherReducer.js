

import { OPERATE_AGENCY_ERROR, OPERATE_AGENCY_LOADING, OPERATE_AGENCY_SUCCESS } from "../constants/otherActionTypes/Agency";
import { OPERATE_DASHBOARD_ERROR, OPERATE_DASHBOARD_LOADING, OPERATE_DASHBOARD_SUCCESS } from "../constants/otherActionTypes/Dashboard";
import { OPERATE_LAB_ERROR, OPERATE_LAB_LOADING, OPERATE_LAB_SUCCESS } from "../constants/otherActionTypes/Lab";
import { OPERATE_USERS_ERROR, OPERATE_USERS_LOADING, OPERATE_USERS_SUCCESS } from "../constants/otherActionTypes/Users";


const initialState = {
  isLoading: false,
  classData: null,
};

export const otherReducer = (state = initialState, action) => {
  switch (action.type) {
      case OPERATE_LAB_LOADING:
        return {
          ...state,
          isLoading: action.isLoading,
        };
  
      case OPERATE_LAB_SUCCESS:
        return {
          ...state,
          isLoading: action.isLoading,
        };
  
      case OPERATE_LAB_ERROR:
        return {
          ...state,
          isLoading: action.isLoading,
        };
        case OPERATE_AGENCY_LOADING:
          return {
            ...state,
            isLoading: action.isLoading,
          };
    
        case OPERATE_AGENCY_SUCCESS:
          return {
            ...state,
            isLoading: action.isLoading,
          };
    
        case OPERATE_AGENCY_ERROR:
          return {
            ...state,
            isLoading: action.isLoading,
          };
          case OPERATE_USERS_LOADING:
            return {
              ...state,
              isLoading: action.isLoading,
            };
      
          case OPERATE_USERS_SUCCESS:
            return {
              ...state,
              isLoading: action.isLoading,
            };
      
          case OPERATE_USERS_ERROR:
            return {
              ...state,
              isLoading: action.isLoading,
            };
            case OPERATE_DASHBOARD_LOADING:
              return {
                ...state,
                isLoading: action.isLoading,
              };
        
            case OPERATE_DASHBOARD_SUCCESS:
              return {
                ...state,
                isLoading: action.isLoading,
              };
        
            case OPERATE_DASHBOARD_ERROR:
              return {
                ...state,
                isLoading: action.isLoading,
              };
    default:
      return state;
  }
};
