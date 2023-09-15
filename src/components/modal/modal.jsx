import React from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "./modal-overlay/modal-overlay";
import {nodePropType, optionalFunc, optionalString} from "../../utils/prop-types";

function Modal({children, header, onClose}) {

  return ReactDOM.createPortal(
    (
      <div className={styles.modalWindow}>
        <div className={`${styles.modalContainer} p-10`}>
          <div className={styles.header}>
            <p className="text text_type_main-large">{header}</p>
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
  children: nodePropType,
  header: optionalString,
  onClose: optionalFunc,
};

export {Modal}