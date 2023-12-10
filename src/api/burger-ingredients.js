import {ENDPOINTS} from "../utils/config-api";
import {request} from "../utils/config-api";

export const getIngredients = () => request(ENDPOINTS.ingredients);