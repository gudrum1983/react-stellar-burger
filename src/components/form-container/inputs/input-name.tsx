import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {TPropsInput} from "./input-email";

export type TPropsInputName = Omit<TPropsInput, 'clearError'>

export function InputName({placeholder = 'Имя', value, isEdit = false, onChange}: TPropsInputName): JSX.Element {

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [disabled, setDisable] = React.useState(false)

  React.useEffect(() => {
    setDisable(isEdit);
  }, []);

  const onIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      setDisable(!disabled)
    }
  }

  const onBlur = () => {
    setDisable(!disabled)
  }

  const text = !!value ? value : ''

  return (

    <div className="input_container">
      <Input
        type={'text'}
        onChange={onChange}
        value={text}
        name={'name'}
        placeholder={placeholder}
        ref={inputRef}
        disabled={disabled}
        {...(isEdit && {icon: "EditIcon", onIconClick: onIconClick, onBlur: onBlur,})}
      />
    </div>
  )
}