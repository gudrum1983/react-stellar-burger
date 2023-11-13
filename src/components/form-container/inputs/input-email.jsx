import {useDispatch, useSelector} from "react-redux";
import {inputsValuesEmail} from "../../../services/inputs-values/inputs-values-selector";
import React from "react";
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {addEmail} from "../../../services/inputs-values/inputs-values-actions";
import {booleanOptional, stringOptional} from "../../../utils/prop-types";


export function InputEmail({placeholder, isEdit = false}) {

  const emailValue = useSelector(inputsValuesEmail)
  const dispatch = useDispatch();

  return (
    <div className="input_container">
      <EmailInput
        onChange={e => dispatch(addEmail(e.target.value))}
        value={emailValue}
        name={'email'}
        isIcon={isEdit}
        {...(placeholder && {placeholder: placeholder})}

      />
    </div>
  )
}

InputEmail.propTypes = {
  placeholder: stringOptional,
  isEdit: booleanOptional,
};