import React from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "./modal-overlay/modal-overlay";
import {nodeElementPropType, functionPropType, stringPropType} from "../../utils/prop-types";
import {useParams} from "react-router-dom";

export function Modal({children, header, onClose}) {

  const params = useParams()
  let newHeader = null

  if (header === "need = params.id") {

    newHeader = `# ${params.id}`
  }


  return ReactDOM.createPortal(
    (
      <div className={styles.modalWindow}>
        <div className={`${styles.modalContainer} p-10`}>
          <div className={styles.header}>
            {newHeader
              ? <p className="text text_type_digits-default">{newHeader}</p>
            : <p className="text text_type_main-large">{header}</p>}

            <button className={`${styles.buttonClose} cursor`} onClick={onClose}><CloseIcon type="primary"/></button>
          </div>
          {children}
        </div>
        <ModalOverlay onClose={onClose}/>
      </div>
    ),
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  children: nodeElementPropType,
  header: stringPropType,
  onClose: functionPropType,
};