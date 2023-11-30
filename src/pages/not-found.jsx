import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {displayLarge} from "../utils/text-elements";


export function NotFound() {
  const navigate = useNavigate();
  function onClick() {
    navigate('/', {replace: false});
  }

  return (
    <div className="not-found">
      {displayLarge({value: "страница 404"})}
      <div className="image-not">
        <Button htmlType={"button"} type="primary" size="medium" children={"ДОМОЙ"} key={"home"} onClick={onClick}/>
      </div>
    </div>
  )
}