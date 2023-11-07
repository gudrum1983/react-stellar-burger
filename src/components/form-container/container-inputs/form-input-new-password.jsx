import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addEmail, addPassword, addUser} from "../../../services/user-inputs/user-inputs-actions";
import {EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {selectedPassword} from "../../../services/user-inputs/user-inputs-selector";
import {optionalString} from "../../../utils/prop-types";
import {useLocation} from "react-router-dom";


export function InputPassword({placeholder = 'Пароль', disabled = false}) {

  const passwordValue = useSelector(selectedPassword)
  const dispatch = useDispatch();
  const location = useLocation()
  const isProfile = location.pathname === "/profile"
/*  console.log("isProfile", isProfile)*/
  const [iconP, setIconP] = React.useState(isProfile ? 'EditIcon' : 'ShowIcon')
  const inputRef = React.useRef(null)
/*  const [iconPP, setIconPP] = React.useState('EditIcon')*/
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    if (isProfile) {
/*      if (iconP === 'EditIcon') {
        setIconP('CloseIcon')
      } else {
        setIconP('EditIcon')
      }*/

    } else {

      if (inputRef.current.type === 'text') {
        inputRef.current.type = 'password'
        setIconP('ShowIcon')
      } else {
        inputRef.current.type = 'text'
        setIconP('HideIcon')
      }
    }
  }

  return (

  <>  {isProfile ? <EmailInput
    type={'password'}
    onChange={e => dispatch(addPassword(e.target.value))}
    value={passwordValue}
    name={'password'}
    placeholder={placeholder}
    isIcon={true}
    error={false}
    errorText={'Ошибка'}
    size={'default'}
  /> :         <Input
    type={'password'}
    placeholder={placeholder}
    onChange={e => dispatch(addPassword(e.target.value))}
    icon= {iconP}
    value={passwordValue}
    name={'password'}
    error={false}
    ref={inputRef}
    onIconClick={onIconClick}
    errorText={'Ошибка'}
    size={'default'}
    {...(iconP === 'EditIcon' && {disabled: true})}
  />}
  </>

  )
}

InputPassword.propTypes = {
  placeholder: optionalString,
};