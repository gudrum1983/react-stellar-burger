import React, {useMemo} from "react";
import {navigateButton, typeButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainerNew, FormContainerUser} from "../components/form-container/form-container";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkUserAuth, getUser, register} from "../services/user/action";
import {userData, userDataMail, userDataName} from "../services/user/selector";
import {addEmail, addUser} from "../services/user-inputs/user-inputs-actions";
import {usePrintParams} from "../utils/func";


export function FeedOrders() {
/*  const dispatch = useDispatch();
  const nameValueTest = useSelector(userDataName)
  const emailValueTest = useSelector(userDataMail)

  React.useEffect(() => {
    dispatch(getUser());
    dispatch(addEmail(nameValueTest))
    dispatch(addUser(emailValueTest))
  }, []);

  const params = useLocation();
  console.log('params',params)

  const navigate = useNavigate();*/
/*  const dispatch = useDispatch();
  const email = useSelector(userDataMail)
  const name = useSelector(userDataName)*/
 /* const pass = useSelector(selectedPassword)*/

/*  function onClick(evt) {
    evt.preventDefault();

    /!*   navigate('/login', {replace: false});*!/
    /!*     postApiRegister(name, pass, email);*!/
    dispatch(register(name, pass, email));
  }*/

/*  const registerFormHeader = "FeedOrders"*/
 /* const profileInputs = [typeInputs.name, typeInputs.profileLogin, typeInputs.password];
  const profileButton = [typeButton.cancel, typeButton.save];
/*  const registerFooterLinks = [typeLinksFooter.alreadyRegistered];*!/*/


  return (
    <FormContainerNew
      header={"FeedOrders"}
      inputs={[]}
      button={[]}
      links={[]}
    />
  )

}