import React from "react";
import {typeButton, typeInputs} from "../utils/inputs";
import {FormContainerUser} from "../components/form-container/form-container";
import {useDispatch, useSelector} from "react-redux";
import {getUser, logout, updateUser} from "../services/user/user-action";
import {userMail, userName} from "../services/user/user-selector";
import {addEmail, addPassword, addUser} from "../services/inputs-values/inputs-values-actions";
import {inputsValuesEmail, inputsValuesPassword, inputsValuesUserName} from "../services/inputs-values/inputs-values-selector";

export function Profile() {

  const dispatch = useDispatch();
  const nameValueTest = useSelector(userName)
  const emailValueTest = useSelector(userMail)

  function setValue() {
    dispatch(getUser());
    dispatch(addEmail(emailValueTest))
    dispatch(addUser(nameValueTest))
    dispatch(addPassword(""))
  }


  React.useEffect(() => {
    setValue()
  }, [nameValueTest, emailValueTest]);

  const nameValueInput = useSelector(inputsValuesUserName)
  const mailValueInput = useSelector(inputsValuesEmail)
  const passwordValueInput = useSelector(inputsValuesPassword)

  let isEditName = nameValueTest !== nameValueInput
  let isEditMail = emailValueTest !== mailValueInput
  let isEditPassword = passwordValueInput !== ''

  const isEdit = React.useMemo(() => {
    return [isEditName, isEditMail, isEditPassword].includes(true)
  }, [isEditName, isEditMail, isEditPassword])

  console.log("isEdit", isEdit)

  function handleReset(e) {
    e.preventDefault()
    dispatch(getUser())
    console.log("isEdit", isEdit)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getUser());
    if (isEdit) {
      dispatch(updateUser(mailValueInput, nameValueInput, passwordValueInput));
      dispatch(addEmail(emailValueTest))
      dispatch(addUser(nameValueTest))
      dispatch(addPassword(""))
    }


  }
  function handleClick(e) {
    e.preventDefault()
    console.log("click","click")
    dispatch(logout());

  }

  const profileInputs = [typeInputs.profileName, typeInputs.profileLogin, typeInputs.password];
  const profileButton = isEdit ? [typeButton.cancel, typeButton.save] : []

  return (
      <FormContainerUser
        inputs={profileInputs}
        button={profileButton}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
  )
}