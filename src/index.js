import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import {Provider} from "react-redux";
import configureStore from "lib/configureStore";
import App from "containers/App";

import "./index.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
