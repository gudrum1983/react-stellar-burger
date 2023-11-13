import {booleanOptional, stringOptional} from "../../../utils/prop-types";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../../services/inputs-values/inputs-values-actions";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {inputsValuesUserName} from "../../../services/inputs-values/inputs-values-selector";

export function InputName({placeholder = 'Имя', isEdit = false}) {

  const nameValue = useSelector(inputsValuesUserName)
  const dispatch = useDispatch();
  const inputRef = React.useRef(null)
  const [disabled, setDisable] = React.useState(null)

  React.useEffect(() => {
    setDisable(isEdit);
  }, []);

  const onIconClick = () => {
    inputRef.current.focus()
    setDisable(!disabled)
  }

  return (
    <div className="input_container">
      <Input
        type={'text'}
        onChange={e => dispatch(addUser(e.target.value))}
        value={nameValue}
        name={'name'}
        placeholder={placeholder}
        ref={inputRef}
        disabled={disabled}
        {...(isEdit && {icon: "EditIcon", onIconClick: onIconClick})}
      />
    </div>
  )
}

InputName.propTypes = {
  placeholder: stringOptional,
  isEdit: booleanOptional,
};