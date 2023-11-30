import {booleanOptional, functionOptional, stringOptional} from "../../../utils/prop-types";
import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

export function InputName({placeholder = 'Имя', value, isEdit = false, onChange}) {

  const inputRef = React.useRef(null)
  const [disabled, setDisable] = React.useState(false)

  React.useEffect(() => {
    setDisable(isEdit);
  }, []);

  const onIconClick = () => {
    inputRef.current.focus()
    setDisable(!disabled)
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
        onFocus
        ref={inputRef}
        disabled={disabled}
        {...(isEdit && {icon: "EditIcon", onIconClick: onIconClick, onBlur: onBlur,})}
      />
    </div>
  )

}

InputName.propTypes = {
  placeholder: stringOptional,
  value: stringOptional,
  isEdit: booleanOptional,
  onChange: functionOptional,
};