import React from "react";
import style from "./container-link.module.css"
export function ContainerLink ({textP, textL}) {

  return (
    <div>
      <p className="text text_type_main-default text_color_inactive">
        {textP} <span className={style.link} >{textL}</span></p>
    </div>
  )
}