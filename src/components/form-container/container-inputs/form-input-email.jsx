import {useDispatch, useSelector} from "react-redux";
import {selectedEmail} from "../../../services/user-inputs/user-inputs-selector";
import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {addEmail} from "../../../services/user-inputs/user-inputs-actions";
import {optionalString} from "../../../utils/prop-types";

export function InputEmail({placeholder = "E-mail"}) {

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