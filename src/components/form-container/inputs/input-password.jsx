import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPassword} from "../../../services/inputs-values/inputs-values-actions";
import {PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {inputsValuesPassword} from "../../../services/inputs-values/inputs-values-selector";
import {stringPropType} from "../../../utils/prop-types";
import {useLocation} from "react-router-dom";

export function InputPassword({placeholder = 'Пароль', disabled = false}) {

  const passwordValue = useSelector(inputsValuesPassword)
  const dispatch = useDispatch();
  const location = useLocation()
  const isProfile = location.pathname === "/profile"

  return (
    <>  {isProfile ? <PasswordInput
      onChange={e => dispatch(addPassword(e.target.value))}
      value={passwordValue}
      name={'password'}
      placeholder={placeholder}
      error={false}
      errorText={'Ошибка'}
      size={'default'}
      icon="EditIcon"
    /> : <PasswordInput
      onChange={e => dispatch(addPassword(e.target.value))}
      value={passwordValue}
      name={'password'}
      placeholder={placeholder}
      error={false}
      errorText={'Ошибка'}
      size={'default'}

    />}
    </>

  )
}

InputPassword.propTypes = {
  placeholder: stringPropType,
};