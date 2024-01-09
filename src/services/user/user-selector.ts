import {TRootState} from "../store";


export const user = (store:TRootState) => store.user.user
export const userName = (store:TRootState) => store.user.user?.name
export const userMail = (store:TRootState) => store.user.user?.email
export const userAuth = (store:TRootState) => store.user.isAuthChecked
