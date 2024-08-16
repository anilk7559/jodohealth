
import * as url from "../../../constants/urls";
import * as Service from "../../../constants/service";
import { operateDashboardError, operateDashboardLoading, operateDashboardSuccess } from "../../actions/otherActions/Dashboard";
import { getData, storageKey } from "../../../constants/storage";


export const getDashboarddata = async () => {
  const token = getData(storageKey.AUTH_TOKEN);
  try {
    operateDashboardLoading(true);
    const response = await Service.get(url.GET_DASHBOARD_DATA, token);

    if ( response.code == 200) {
      operateDashboardSuccess(true);
      return { success: true, response };
    } else {
      operateDashboardError(true);
      return { success: false, error: response.error_message };
    }
  } catch (error) {
    console.error("Error in getdata:", error);
    operateDashboardError(true);
    return { success: false, error: "An error occurred" };
  } finally {
    operateDashboardLoading(false);
  }
};
