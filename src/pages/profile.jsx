import React, {useMemo} from "react";
import {navigateButton, typeButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainerNew, FormContainerUser} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";
import {postApiRegister} from "../utils/newApiRegister";
import {useDispatch, useSelector} from "react-redux";
import {
  selectedEmail,
  selectedPassword,
  selectedUserName,
} from "../services/user-inputs/user-inputs-selector";
import {checkUserAuth, getUser, register} from "../services/user/action";
import {setIngredientDetails} from "../services/ingredient-details/ingredient-details-actions";


export function Profile() {

  React.useEffect(() => {
    dispatch(getUser());
  }, []);





  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(selectedEmail)
  const name = useSelector(selectedUserName)
  const pass = useSelector(selectedPassword)

/*  function onClick(evt) {
    evt.preventDefault();

    /!*   navigate('/login', {replace: false});*!/
    /!*     postApiRegister(name, pass, email);*!/
    dispatch(register(name, pass, email));
  }*/

/*  const registerFormHeader = "PROFILE"*/
  const profileInputs = [typeInputs.name, typeInputs.profileLogin, typeInputs.password];
  const profileButton = [typeButton.cancel, typeButton.save];
/*  const registerFooterLinks = [typeLinksFooter.alreadyRegistered];*!/*/


  return (
    <FormContainerUser
      inputs={profileInputs}
      button={profileButton}
    />
  )

}