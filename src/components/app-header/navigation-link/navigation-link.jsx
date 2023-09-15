import React from "react";
import {nodePropType} from "../../../utils/prop-types";

function NavigationLink({icon, children}) {

  const textType = {
    primary: "text text_type_main-default",
    secondary: "text text_type_main-default text_color_inactive",
  }

  return (
    <>
      {icon}
      <p className={`${textType[icon.props.type]} pl-2`}>
        {children}
      </p>
    </>
  );
}

NavigationLink.propTypes = {
  icon: nodePropType,
  children: nodePropType,
};

export {NavigationLink}