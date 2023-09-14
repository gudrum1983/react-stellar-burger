import React from "react";
import styles from "./modal-overlay.module.css";
import {optionalFunc} from "../../../utils/prop-types";


function ModalOverlay({onClose}) {

  ModalOverlay.propTypes = {
    onClose: optionalFunc,
  };

  function keyClose(e) {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  function clickClose() {
      onClose()
  }

  React.useEffect(() => {
    document.addEventListener("keydown", keyClose)
    return () => {
      document.removeEventListener("keydown", keyClose);
    }
  }, [])

  return (
    <div className={`${styles.modalOverlay}`} onClick={clickClose}></div>
  )
}

export {
  ModalOverlay
}
