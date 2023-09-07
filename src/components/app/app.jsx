import styles from "./app.module.css";
import { data } from "../../utils/data";
import { AppHeader } from '../app-header/app-header'
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.Appmain}>
      <BurgerIngredients data={data}/>
      </main>
{/*      <BurgerConstructor/>*/}
    </div>
  );
}

export default App;
