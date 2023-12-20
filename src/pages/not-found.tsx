import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Text} from "../components/typography/text/text";
import {DISPLAY_LARGE} from "../utils/types";


export function NotFound():JSX.Element {
  const navigate = useNavigate();
  function onClick():void {
    navigate('/', {replace: false});
  }

  return (
    <div className="not-found">
      <Text size={DISPLAY_LARGE}>страница 404</Text>
      <div className="image-not">
        <Button htmlType={"button"} type="primary" size="medium" onClick={onClick}>"ДОМОЙ"</Button>
      </div>
    </div>
  )
}