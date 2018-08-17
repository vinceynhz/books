import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import registerServiceWorker from "registerServiceWorker";

import "./index.css";

import {createStore} from "redux";
import bookApp from "./reducers";
import {Provider} from "react-redux";

const store = createStore(bookApp);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
