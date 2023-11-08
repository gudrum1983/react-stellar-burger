import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {addCheckedToken, addEmail, addUser} from "../../../services/user-inputs/user-inputs-actions";
import {selectedCode, selectedEmail, selectedUserName} from "../../../services/user-inputs/user-inputs-selector";
import {optionalString} from "../../../utils/prop-types";


export function InputText({placeholder}) {

  const value = useSelector(selectedCode)
  const dispatch = useDispatch();


  const inputRef = React.useRef(null)

  return (
    <Input
      type={'text'}
      placeholder={placeholder}
      onChange={e => dispatch(addCheckedToken(e.target.value))}
      value={value}
      name={'name'}
      error={false}
      ref={inputRef}
      errorText={'Ошибка'}
      size={'default'}
    />
  )
}

export function InputName({placeholder}) {
  const [value, setValue] = React.useState('')
  const dispatch = useDispatch();
  React.useMemo(() => {
    dispatch(addUser(value));
  }, [value]);

  const inputRef = React.useRef(null)

  return (
    <Input
      type={'text'}
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      value={value}
      name={'name'}
      error={false}
      ref={inputRef}
      errorText={'Ошибка'}
      size={'default'}
    />
  )
}

