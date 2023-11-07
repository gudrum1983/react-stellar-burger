import {useDispatch, useSelector} from "react-redux";
import {selectedEmail} from "../../../services/user-inputs/user-inputs-selector";
import React from "react";
import {EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {addEmail} from "../../../services/user-inputs/user-inputs-actions";
import {optionalString} from "../../../utils/prop-types";
import {userDataMail, userDataName} from "../../../services/user/selector";
import {useLocation, useParams} from "react-router-dom";

export function InputEmail({placeholder = "E-mail"}) {

  const location = useLocation()
  const isProfile = location.pathname === "/profile"
  const emailValue = useSelector(selectedEmail)
  const dispatch = useDispatch();
  const inputRef = React.useRef(null)

  return (
    <>  {isProfile ? <EmailInput
      type={'email'}
      onChange={e => dispatch(addEmail(e.target.value))}
      value={emailValue}
      name={'email'}
      placeholder={placeholder}
      isIcon={true}
      error={false}
      errorText={'Ошибка'}
      size={'default'}
    /> : <Input
      type={'email'}
      placeholder={placeholder}
      onChange={e => dispatch(addEmail(e.target.value))}
      value={emailValue}
      name={'email'}
      error={false}
      ref={inputRef}
      errorText={'Ошибка'}
      size={'default'}

    />}
    </>

  )
}

InputEmail.propTypes = {
  placeholder: optionalString,
};