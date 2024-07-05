// dashboardController.js
import { publicAxios } from "./service/axios-config";

export function fetchUserDetailsByEmail(email) {
    return publicAxios.get(`/userbase/details?email=${email}`);
}

