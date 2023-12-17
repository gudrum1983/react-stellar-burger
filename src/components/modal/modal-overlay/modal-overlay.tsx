import React from "react";
import styles from "./modal-overlay.module.css";
import {TPropsModalOverlay} from "../../../utils/types";


export function ModalOverlay({onClose}:TPropsModalOverlay):JSX.Element  {

  React.useEffect(() => {
    function keyClose(e: KeyboardEvent): void {
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