import {useDispatch, useSelector} from "react-redux";
import {selectedEmail} from "../../../services/user-inputs/user-inputs-selector";
import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {addEmail} from "../../../services/user-inputs/user-inputs-actions";
import {optionalString} from "../../../utils/prop-types";
import {userDataMail, userDataName} from "../../../services/user/selector";
import {useParams} from "react-router-dom";

export function InputEmail({placeholder = "E-mail"}) {


/*  const param = useParams()
  console.log('param', param)*/
  /*const email =


    useSelector(userDataMail)
  const name = useSelector(userDataName)*/



  const emailValue = useSelector(selectedEmail)
  const dispatch = useDispatch();
  const inputRef = React.useRef(null)

  return (
    <Input
      type={'email'}
      placeholder={placeholder}
      onChange={e => dispatch(addEmail(e.target.value))}
      value={emailValue}
      name={'email'}
      error={false}
      ref={inputRef}
      errorText={'Ошибка'}
      size={'default'}
    />
  )
}

InputEmail.propTypes = {
  placeholder: optionalString,
};