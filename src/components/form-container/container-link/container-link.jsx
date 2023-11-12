import React from "react";
import style from "./container-link.module.css"
import {Link} from "react-router-dom";
import {stringPropType} from "../../../utils/prop-types";

export function ContainerLink({textDescription, textLink, to}) {

  return (
    <div>
      <p className="text text_type_main-default text_color_inactive">
        {textDescription}
        <span> <Link className={style.link} to={to}>{textLink}</Link></span>
      </p>
    </div>
  )
}

ContainerLink.propTypes = {
  textDescription: stringPropType,
  textLink: stringPropType,
  to: stringPropType,
};
