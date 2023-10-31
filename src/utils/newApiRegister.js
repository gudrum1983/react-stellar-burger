import {getRegister} from "../api/config";
import {useSelector} from "react-redux";
import {selectBurgerConstructor} from "../services/burger-constructor/burger-constructor-selector";
import {selectedInputs} from "../services/user-inputs/user-inputs-selector";


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

