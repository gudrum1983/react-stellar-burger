import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../../services/inputs-values/inputs-values-actions";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {stringOptional} from "../../../utils/prop-types";
import {inputsValuesUserName} from "../../../services/inputs-values/inputs-values-selector";

export function InputName({placeholder = 'Имя', isEdit = false}) {

  const nameValue = useSelector(inputsValuesUserName)
  const dispatch = useDispatch();
  const inputRef = React.useRef(null)
  const [disable, setDisable] = React.useState(null)

  React.useEffect(() => {
    setDisable(isEdit);
  }, []);

  const onIconClick = () => {
    inputRef.current.focus()
    setDisable(!disable)
  }

  return (
    <div className="input_container">
      <Input
        type={'text'}
        onChange={e => dispatch(addUser(e.target.value))}
        value={nameValue}
        name={'name'}
        isIcon={isEdit}
        placeholder={placeholder}
        ref={inputRef}
        {...(isEdit && {icon: "EditIcon", onIconClick: onIconClick})}
      />
    </div>
  )


  /*
    return (
      <>  {isProfile ? <EmailInput
        type={'text'}
        onChange={e => dispatch(addUser(e.target.value))}
        value={nameValue}
        name={'name'}
        placeholder={placeholder}
        isIcon={true}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      /> : <Input
        type={'text'}
        placeholder={placeholder}
        onChange={e => dispatch(addUser(e.target.value))}
        value={nameValue}
        name={'name'}
        error={false}
        ref={inputRef}
        errorText={'Ошибка'}
        size={'default'}
      />}
      </>
    )*/
}

InputName.propTypes = {
  placeholder: stringOptional,
};