import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import bookApp from "lib/reducers";

export default function configureStore(){
  return createStore(
    bookApp,
    applyMiddleware(
      thunkMiddleware
    )
  );
}