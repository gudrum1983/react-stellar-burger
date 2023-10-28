import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

export function InputPassword ({placeholder}) {
  const [value, setValue] = React.useState('')
  const [iconP, setIconP] = React.useState('ShowIcon')
  const inputRef = React.useRef(null)


  const onIconClick = () => {

    setTimeout(() => inputRef.current.focus(), 0)
    if (inputRef.current.type === 'text') {
      inputRef.current.type = 'password'
      setIconP('ShowIcon')
    } else {
      inputRef.current.type = 'text'
      setIconP('HideIcon')
    }
    /*      alert('Icon Click Callback')*/
  }
  return (
    <Input
      type={'password'}
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      icon={iconP}
      value={value}
      name={'name'}
      error={false}
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
      extraClass="ml-1"
    />
  )
}