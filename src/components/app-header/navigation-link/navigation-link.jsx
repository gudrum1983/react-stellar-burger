import React from "react";
import {navigationLinkPropType} from "../../../utils/prop-types";

const textType = {
  primary: "text text_type_main-default",
  secondary: "text text_type_main-default text_color_inactive",
}

NavigationLink.propTypes = {
  icon: navigationLinkPropType,
};

function NavigationLink(props) {
  return (
    <>
      {props.icon}
      <p className={`${textType[props.icon.props.type]} pl-2`}>
        {props.children}
      </p>
    </>
  );
}

export {NavigationLink}