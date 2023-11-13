import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPassword} from "../../../services/inputs-values/inputs-values-actions";
import {PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {inputsValuesPassword} from "../../../services/inputs-values/inputs-values-selector";
import {booleanOptional, stringOptional} from "../../../utils/prop-types";


export function InputPassword({placeholder, isEdit = false}) {

  const passwordValue = useSelector(inputsValuesPassword)
  const dispatch = useDispatch();


  console.log({isEdit})

  return (
    <div className="input_container">
      <PasswordInput
        onChange={e => dispatch(addPassword(e.target.value))}
        value={passwordValue}
        name={'password'}
        {...(placeholder && {placeholder: placeholder})}
        {...(isEdit && {icon:"EditIcon"})}
      />
    </div>
  )
}

InputPassword.propTypes = {
  placeholder: stringOptional,
  isEdit: booleanOptional
};