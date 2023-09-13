import React from "react";
import ReactDOM from "react-dom";
/*import {ModalOrderDetails} from "./order-details/order-details";*/
import styles from "./modal-overlay.module.css";


function ModalOverlay({onClose}) {

  function keyClose(e) {
    const key = e.code;
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
    <div className={`${styles.modalOverlay}`} onClick={clickClose}>
    </div>

  )
}

export {
  ModalOverlay
}
