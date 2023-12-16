import React from "react";

import {Link} from "react-router-dom";
import classes from "./navigation-link.module.css";
import {Text} from "../typography/text/text";
import {COLOR_INACTIVE} from "../../utils/types";

type TPropsNavigationLink = {
  to: string;
  icon: JSX.Element;
  label: string;
}

export function NavigationLink({to, icon, label}: TPropsNavigationLink): JSX.Element {

  const isInactive = icon.props.type === 'secondary'

  return (
    <Link to={to} className={classes.linkNav}>
      {icon}
      <Text extraClass={`pl-2 ${classes.label}`} {...(isInactive && {color: COLOR_INACTIVE})} >
        {label}
      </Text>
    </Link>
  );
}