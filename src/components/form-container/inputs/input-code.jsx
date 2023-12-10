import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {functionOptional, stringOptional} from "../../../utils/prop-types";


export function InputCode({value, onChange}) {

  return (
    <div className="input_container">
      <Input
        placeholder={"Введите код из письма"}
        onChange={onChange}
        value={value}
        name={'token'}
      />
    </div>
  )
}

InputCode.propTypes = {
  value: stringOptional,
  onChange: functionOptional,
};