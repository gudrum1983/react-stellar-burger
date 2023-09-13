import React from "react";
import ReactDOM from "react-dom";
import {ModalOrderDetails} from "./order-details/order-details";
import styles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "./modal-overlay/modal-overlay";

function Modal(props) {
  /*  render() {*/
  const {children, header, onClose} = props;
  // Возвращаем ReactDOM.createPortal,
  // который поместит дочерние элементы в modalRoot
  return ReactDOM.createPortal(
    (
      <div className={styles.modalWindow}>
        <div className={`${styles.modalContainer} p-10`}>
          <div className={styles.header}>
            <p className="text text_type_main-large">{header}</p>
            <button className={styles.buttonClose} onClick={onClose}><CloseIcon type="primary"/></button>
          </div>
          {children}
        </div>
        <ModalOverlay onClose={onClose}/>
      </div>
    ),
    document.getElementById("modal")
  );
  /*}*/
}

export {Modal}