import React from "react";
import style from "./container-link.module.css"
import {Link} from "react-router-dom";
import {Text} from "../../typography/text/text";
import {COLOR_INACTIVE} from "../../../utils/types";

export type TPropsContainerLink = {
  textDescription:string;
  textLink:string;
  to:string;
}


export function ContainerLink({textDescription, textLink, to}:TPropsContainerLink):JSX.Element {

  return (
    <div>
      <Text color={COLOR_INACTIVE}>
        {textDescription}
        <span> <Link className={style.link} to={to}>{textLink}</Link></span>
      </Text>
    </div>
  )
}
