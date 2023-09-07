import PropTypes from 'prop-types';
import React from "react";
import styles from "../app-header/app-header.module.css";

const textType = {
  primary: "text text_type_main-default",
  secondary: "text text_type_main-default text_color_inactive",
}

NavigationLink.propTypes = {
    icon: PropTypes.node.isRequired}

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