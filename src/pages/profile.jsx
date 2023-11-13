import React from "react";
import {profileButtons, typeInputs} from "../utils/inputs";
import {FormContainer} from "../components/form-container/form-container";
import {useDispatch, useSelector} from "react-redux";
import {getUser, updateUser} from "../services/user/user-action";
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

  const profileInputs = [typeInputs.nameProfile, typeInputs.emailProfile, typeInputs.passwordProfile];
/*  const profileButton = isEdit ? [profileButton.cancel, profileButton.save] : []*/

  return (
      <FormContainer
        inputs={profileInputs}
        {...(isEdit && {button: profileButtons})}
/*        button={profileButton}*/
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
  )
}