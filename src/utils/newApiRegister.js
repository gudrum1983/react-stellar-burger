import {getRegister, getLogin} from "../api/config";
import {useSelector} from "react-redux";
import {selectBurgerConstructor} from "../services/burger-constructor/burger-constructor-selector";
import {selectedInputs} from "../services/user-inputs/user-inputs-selector";
import {login} from "../services/user/action";


/*const url = "https://norma.nomoreparties.space/api/auth/register"*/
export function postApiRegister(name, pass, email) {

    getRegister(name, pass, email)
      .then(res => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })

}

export function postApiLogin(pass, email) {

  getLogin(pass, email)
    .then(res => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })

}

