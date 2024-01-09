import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {TPropsInput} from "./input-email";

export type TPropsInputCode =  Pick<TPropsInput, 'value'|'onChange'>

export function InputCode({value, onChange}:TPropsInputCode):JSX.Element {

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