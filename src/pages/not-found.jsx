import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";


export function NotFound() {
  const navigate = useNavigate();
  function onClick() {
    navigate('/', {replace: false});
  }

  return (
    <div className="not-found">
      <p className="text text_type_main-large text_color_primary">страница 404</p>
      <div className="image-not">
        <Button htmlType={"button"} type="primary" size="medium" children={"ДОМОЙ"} key={"home"} onClick={onClick}/>
      </div>
    </div>
  )
}