import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import {store} from "./services/store";

/*StrictMode — инструмент для обнаружения потенциальных проблем в приложении, не рендерит видимого UI.
  Строгий режим активирует дополнительные проверки и предупреждения для своих потомков.*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
