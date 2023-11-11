import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../../services/inputs-values/inputs-values-actions";
import {EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {optionalString} from "../../../utils/prop-types";
import {inputsValuesUserName} from "../../../services/inputs-values/inputs-values-selector";
import {useLocation} from "react-router-dom";

export function InputName({placeholder = 'Имя'}) {

  const location = useLocation()
  const isProfile = location.pathname === "/profile"
  const nameValue = useSelector(inputsValuesUserName)
  const dispatch = useDispatch();
  const inputRef = React.useRef(null)

  return (
    <>  {isProfile ? <EmailInput
      type={'text'}
      onChange={e => dispatch(addUser(e.target.value))}
      value={nameValue}
      name={'name'}
      placeholder={placeholder}
      isIcon={true}
      error={false}
      errorText={'Ошибка'}
      size={'default'}
    /> : <Input
      type={'text'}
      placeholder={placeholder}
      onChange={e => dispatch(addUser(e.target.value))}
      value={nameValue}
      name={'name'}
      error={false}
      ref={inputRef}
      errorText={'Ошибка'}
      size={'default'}
    />}
    </>
  )
}

InputName.propTypes = {
  placeholder: optionalString,
};