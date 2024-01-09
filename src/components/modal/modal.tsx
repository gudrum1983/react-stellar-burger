import React, {PropsWithChildren} from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "./modal-overlay/modal-overlay";
import {useParams} from "react-router-dom";
import {Text} from "../typography/text/text";
import {DISPLAY_LARGE} from "../../utils/types";
import {Digits} from "../typography/digits/digits";

export type TPropsModal = {
  header: string;
  onClose: () => void ;
}

export function Modal({children, header, onClose}:PropsWithChildren<TPropsModal>):JSX.Element {

  const params = useParams()
  const needNewHeader: boolean = (header === "need = params.id")

  let newHeader: string | null = null

  if (needNewHeader) {
    newHeader = `# ${params.id}`
  }

  return ReactDOM.createPortal(
    (
      <div className={styles.modalWindow}>
        <div className={`${styles.modalContainer} p-10`}>
          <div className={styles.header}>
            {needNewHeader
              ? <Digits>{newHeader}</Digits>
              : <Text size={DISPLAY_LARGE}>{header}</Text>}
            <button className={`${styles.buttonClose} cursor`} onClick={onClose}><CloseIcon type="primary"/></button>
          </div>
          {children}
        </div>
        <ModalOverlay onClose={onClose}/>
      </div>
    ),
    document.getElementById("modal") as HTMLElement
  );
}