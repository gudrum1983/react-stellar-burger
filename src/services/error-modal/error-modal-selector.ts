import {TRootState} from "../store";

export const isOpenErrorModal = (store:TRootState) => store.errorModal.openErrorModal

export const errorModalText = (store:TRootState) => store.errorModal.errorText