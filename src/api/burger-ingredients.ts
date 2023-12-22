import {ENDPOINTS} from "../utils/config-api";
import {request} from "../utils/config-api";
import {MessageIngredients} from "./user";

export const getIngredients = (): Promise<MessageIngredients> => request(ENDPOINTS.ingredients);