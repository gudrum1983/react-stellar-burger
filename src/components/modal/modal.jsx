import React from "react";
import ReactDOM from "react-dom";
import {ModalOrderDetails} from "./order-details/order-details";
import styles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Modal(props) {
/*  render() {*/
    const { children, header, onClose } = props;
    // Возвращаем ReactDOM.createPortal,
    // который поместит дочерние элементы в modalRoot
    return ReactDOM.createPortal(
      (
        <>
        <div className={`${styles.modalContainer} p-10`} onClick={onClose}>
          <div className={styles.header}>
            <p className="text text_type_main-large">Заголовок должен быть с условием</p>
            <button className={styles.buttonClose}><CloseIcon type="primary" /></button>
          </div>
          <ModalOrderDetails></ModalOrderDetails>
{/*         <div>{children}</div>*/}
        </div>
{/*        <ModalOverlay/>*/}
        </>
      ),
      document.getElementById("modal")
    );
  /*}*/
}
export {Modal}