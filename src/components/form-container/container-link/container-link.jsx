import React from "react";
import style from "./container-link.module.css"
import {Link} from "react-router-dom";

export function ContainerLink ({textP, textL, to}) {

  return (
    <div>
      <p className="text text_type_main-default text_color_inactive">
        {textP} <span>
          <Link className={style.link} to={to}>
          {textL}
        </Link>
</span></p>
    </div>
  )
}