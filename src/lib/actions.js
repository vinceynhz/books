import fetch from "lib/TimedFetch";
/*
constants
 */
const bookServiceUrl = "http://192.168.1.127:23456/";
// const openLibraryUrl = "https://openlibrary.org/search.json?q=";

export const BookFormat = {
  HARD_COVER: "HC",
  PAPER_BACK: "PB",
  GRAPHIC_NOVEL: "GN",
  UNSET: "",
};

/*
internally triggered actions
 */
export const TOGGLE_DIMMER = "TOGGLE_DIMMER";
export const toggleDimmer = () => ({
  type: TOGGLE_DIMMER,
});

/*
user triggered actions
 */
export const SELECT_BOOK = "SELECT_BOOK";
export const selectBook = (id) => ({
  type: SELECT_BOOK,
  id,
});

export const SELECT_AUTHOR = "SELECT_AUTHOR";
export const selectAuthor = (id) => ({
  type: SELECT_AUTHOR,
  id,
});

/*
fetch triggered actions
*/
export const REQUEST_BOOKS = "REQUEST_BOOKS";
export const requestBooks = () => ({
  type: REQUEST_BOOKS,
});

export const RECEIVE_BOOKS = "RECEIVE_BOOKS";
export const receiveBooks = (jsonBooks) => ({
  type: RECEIVE_BOOKS,
  timestamp: new Date(),
  jsonBooks,
});

export const REQUEST_AUTHORS = "REQUEST_AUTHORS";
export const requestAuthors = () => ({
  type: REQUEST_AUTHORS,
});

export const RECEIVE_AUTHORS = "RECEIVE_AUTHORS";
export const receiveAuthors = (jsonAuthors) => ({
  type: RECEIVE_AUTHORS,
  timestamp: new Date(),
  jsonAuthors,
});

export const REQUEST_ERROR = "REQUEST_ERROR";
export const requestError = (error) => ({
  type: REQUEST_ERROR,
  error
});

/*
fetch actions
 */
/**
 * To retrieve the books from the local db, it returns a promise that when fulfilled it will trigger the proper actions
 * to update the status.
 *
 * @returns {function(*): Promise<Object>}
 * @promise {dispatch(action(json))}
 * @error {dispatch(action(error))}
 */
export function fetchBooks() {
  return function (dispatch) {
    dispatch(requestBooks());
    return fetch(bookServiceUrl + "books")
      .then(
        json => dispatch(receiveBooks(json)),
        error => dispatch(requestError(error)),
      );
  };
}

/**
 * To retrieve the authors from the local db, it returns a promise that when fulfilled it will trigger the proper
 * actions to update the status.
 *
 * @returns {function(*): Promise<Object>}
 * @promise {dispatch(action(json))}
 * @error {dispatch(action(error))}
 */
export function fetchAuthors() {
  return function (dispatch) {
    dispatch(requestAuthors());
    return fetch(bookServiceUrl + "authors")
      .then(
        json => dispatch(receiveAuthors(json)),
        error => dispatch(requestError(error))
      );
  };
}