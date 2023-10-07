import React from "react";
import styles from "./modal-overlay.module.css";
import {optionalFunc} from "../../../utils/prop-types";

export function ModalOverlay({onClose}) {

  React.useEffect(() => {
    function keyClose(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener("keydown", keyClose)
    return () => {
      document.removeEventListener("keydown", keyClose);
    }
  }, [])

  return (
    <div className={`${styles.modalOverlay}`} onClick={onClose}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: optionalFunc,
};