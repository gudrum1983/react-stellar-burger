import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

import {TEXT_SIZES} from "../utils/text-elements";
import {Text} from "../components/typography/text/text";


export function NotFound() {
  const navigate = useNavigate();
  function onClick() {
    navigate('/', {replace: false});
  }

  return (
    <div className="not-found">
      <Text size={TEXT_SIZES.DISPLAY_LARGE}>страница 404</Text>
      <div className="image-not">
        <Button htmlType={"button"} type="primary" size="medium" children={"ДОМОЙ"} key={"home"} onClick={onClick}/>
      </div>
    </div>
  )
}