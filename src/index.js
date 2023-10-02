import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from './services/reducers/index';
import "./index.css";
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/*const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers();

const store = createStore(rootReducer, enhancer);*/


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

// Инициализируем хранилище с помощью корневого редьюсера
//const store = createStore(rootReducer);

ReactDOM.render(
  /*StrictMode — инструмент для обнаружения потенциальных проблем в приложении, не рендерит видимого UI.
    Строгий режим активирует дополнительные проверки и предупреждения для своих потомков.*/
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

