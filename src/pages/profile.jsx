import React from "react";
import {typeButton, typeInputs} from "../utils/inputs";
import {FormContainerUser} from "../components/form-container/form-container";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../services/user/action";
import {userDataMail, userDataName} from "../services/user/selector";
import {addEmail, addPassword, addUser} from "../services/user-inputs/user-inputs-actions";
import {selectedEmail, selectedPassword, selectedUserName} from "../services/user-inputs/user-inputs-selector";

export function Profile() {
  const dispatch = useDispatch();
  const nameValueTest = useSelector(userDataName)
  const emailValueTest = useSelector(userDataMail)

  let restart = false
function test() {
  dispatch(getUser());
  dispatch(addEmail(emailValueTest))
  dispatch(addUser(nameValueTest))
  dispatch(addPassword(""))
}


  React.useEffect(() => {
test()
  }, [restart]);

  const nameValueInput = useSelector(selectedUserName)
  const mailValueInput = useSelector(selectedEmail)
  const passwordValueInput = useSelector(selectedPassword)

  let isEditName = nameValueTest !== nameValueInput
  let isEditMail = emailValueTest !== mailValueInput
  let isEditPassword = passwordValueInput !== ''

  const isEdit = React.useMemo(() => {
    return [isEditName, isEditMail, isEditPassword].includes(true)
  }, [isEditName, isEditMail, isEditPassword])

  console.log("isEdit", isEdit)

function handleReset(e) {
    e.preventDefault()
    console.log('клац')
  test()
/*  dispatch(getUser());
  dispatch(addEmail(emailValueTest))
  dispatch(addUser(nameValueTest))
  dispatch(addPassword(""))*/
   /* dispatch(register(name, pass, email))*/;
}

  function handleSubmit(e) {
    e.preventDefault()
    console.log('жбямк')

  }


  const profileInputs = [typeInputs.profileName, typeInputs.profileLogin, typeInputs.password];
  const profileButton = isEdit ? [typeButton.cancel, typeButton.save] : []

  return (
    <section className={"profileSection"}>
      <div className={"profilePanel"}>
        <ul className={"profileUl"}>
          <li>
            <NavLink className={`text text_type_main-medium text_color_inactive defaultNavLink`}
                     to={"/profile"}
                     end>Профиль</NavLink>
          </li>
          <li>
            <NavLink className={`text text_type_main-medium text_color_inactive defaultNavLink`}
                     to={"/profile/orders"}>История
              заказов</NavLink>
          </li>
          <li>
            <NavLink className={`text text_type_main-medium text_color_inactive defaultNavLink`}
                     to={"/profile/exit"}>Выход</NavLink>
          </li>
        </ul>
        <p className={`text text_type_main-small text_color_inactive pText`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>

      </div>
      <FormContainerUser
        inputs={profileInputs}
        button={profileButton}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
    </section>


  )

}