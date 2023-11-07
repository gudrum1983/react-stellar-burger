import React, {useRef} from "react";
import {nodePropType} from "../../../utils/prop-types";
import {Link, useLocation} from "react-router-dom";
import classes from "./navigation-link.module.css";

export function NavigationLink({to, icon, children}) {

  const params = useLocation();
  const isActive = params.pathname === to

/*  console.log("tttt",icon.props.type)*/

/*  icon.props.type = !isActive
    ? "secondary"
    : "primary"*/


/*  console.log("tttt2",icon)
  const textStyle = isActive
    ? "text text_type_main-default"
    : "text text_type_main-default text_color_inactive"*/

  const textType = {
    primary: "text text_type_main-default",
    secondary: "text text_type_main-default text_color_inactive",
  }

  return (
    <Link to={to} className={classes.linkNav}>
      {icon}
      <p className={`${textType[icon.props.type]} pl-2`}>
{/*      <p className={`${textStyle} pl-2`}>*/}
        {children}
      </p>
    </Link>
  );
}

NavigationLink.propTypes = {
  icon: nodePropType,
  children: nodePropType,
};