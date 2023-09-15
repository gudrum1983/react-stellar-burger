import React from "react";
import {nodePropType} from "../../../utils/prop-types";

const textType = {
  primary: "text text_type_main-default",
  secondary: "text text_type_main-default text_color_inactive",
}

function NavigationLink({icon, children}) {

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