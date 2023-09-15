import React from "react";
import styles from "./modal-overlay.module.css";
import {optionalFunc} from "../../../utils/prop-types";


function ModalOverlay({onClose}) {

  function clickClose() {
      onClose()
  }

  React.useEffect(() => {
    document.addEventListener("keydown", keyClose)
    function keyClose(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    return () => {
      document.removeEventListener("keydown", keyClose);
    }
  }, [])

  return (
    <div className={`${styles.modalOverlay}`} onClick={clickClose}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: optionalFunc,
};

export {
  ModalOverlay
}
