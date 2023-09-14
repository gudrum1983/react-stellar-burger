import React from "react";
import {navigationLinkPropType} from "../../../utils/prop-types";

const textType = {
  primary: "text text_type_main-default",
  secondary: "text text_type_main-default text_color_inactive",
}

function NavigationLink({icon, children}) {

  NavigationLink.propTypes = {
    icon: navigationLinkPropType,
  };

  return (
    <>
      {icon}
      <p className={`${textType[icon.props.type]} pl-2`}>
        {children}
      </p>
    </>
  );
}

export {NavigationLink}