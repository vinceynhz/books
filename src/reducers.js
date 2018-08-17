import {combineReducers} from "redux";

import {
  ADD_BOOK,
} from "actions";

/*
State of the whole application:
{
  books : {
    id: {
      title: "whatever",
      authors: ["", ""],
      year: "1234",
      format: "HC",
      isbn: "cscds",
    },
    other-id: {
      title: "whatever",
      authors: ["", ""],
      year: "1234",
      format: "HC",
      isbn: "cscds",
    }
  },
}
 */

function books(state = {}, action) {
  switch (action.type) {
    case ADD_BOOK:
      console.log("adding new book");
      let newBooks = Object.assign({}, state);
      newBooks[action.id] = action.book;
      return newBooks;
    default:
      console.log("nothing to do here");
      console.log(state);
      return state;
  }
}

const bookApp = combineReducers({
  books,
});

export default bookApp;