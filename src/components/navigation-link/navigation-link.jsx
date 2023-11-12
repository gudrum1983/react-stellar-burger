import React from "react";
import {optionalNodeElement, optionalString} from "../../utils/prop-types";
import {Link} from "react-router-dom";
import classes from "./navigation-link.module.css";

export function NavigationLink({to, icon, label}) {

  const textType = {
    primary: "text text_type_main-default",
    secondary: "text text_type_main-default text_color_inactive",
  }

  return (
    <Link to={to} className={classes.linkNav}>
      {icon}
      <p className={`${textType[icon.props.type]} pl-2 ${classes.label}`}>
        {label}
      </p>
    </Link>
  );
}

NavigationLink.propTypes = {
  icon: optionalNodeElement,
  label: optionalString,
  to: optionalString,
};