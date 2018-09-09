import fetch from "lib/TimedFetch";
/*
constants
 */
const bookServiceUrl = "http://192.168.1.136:8080/";
const openLibraryUrl = "https://openlibrary.org/search.json?";

const APPLICATION_JSON = "application/json";

/*
enums
 */
export const BookFormat = {
  HARD_COVER: {value: "HC", label: "Hardcover"},
  PAPER_BACK: {value: "PB", label: "Paperback"},
  GRAPHIC_NOVEL: {value: "GN", label: "Graphic Novel"},
};

export const ResourceType = {
  BOOKS: "BOOKS",
  AUTHORS: "AUTHORS",
  SEARCH: "SEARCH"
};

export const RequestScope = {
  ALL: "ALL",
  ONE: "ONE",
};

export const ResponseAction = {
  ADDED: "ADDED",
  UPDATED: "UPDATED",
  DELETED: "DELETED",
};

export const SearchStatus = {
  NONE: "NONE",
  FOUND: "FOUND",
  NOT_FOUND: "NOT_FOUND",
};

/*
internally triggered actions
 */
export const START_BARCODE_ENTRY = "START_BARCODE_ENTRY";
export const startBarcodeEntry = () => ({
  type: START_BARCODE_ENTRY,
});

export const END_BARCODE_ENTRY = "END_BARCODE_ENTRY";
export const endBarcodeEntry = () => ({
  type: END_BARCODE_ENTRY,
});

/*
user triggered actions
 */
export const SELECT_RESOURCE = "SELECT_RESOURCE";
export const selectResource = (resource, id) => ({
  type: SELECT_RESOURCE,
  resource,
  id,
});

export const CREATE_BOOK = "CREATE_BOOK";
export const createBook = (bookData) => ({
  type: CREATE_BOOK,
  bookData,
});

/*
fetch triggered actions
*/

export const REQUEST_DATA = "REQUEST_DATA";
export const requestData = (resource, scope) => ({
  type: REQUEST_DATA,
  resource,
  scope,
});

export const RECEIVE_DATA = "RECEIVE_DATA";
export const receiveData = (resource, scope, data, requestInfo) => ({
  type: RECEIVE_DATA,
  timestamp: new Date(),
  resource,
  scope,
  data,
  requestInfo,
});

export const REQUEST_ERROR = "REQUEST_ERROR";
export const requestError = (resource, error) => ({
  type: REQUEST_ERROR,
  timestamp: new Date(),
  resource,
  error
});

/*
fetch actions
 */
/**
 * To retrieve the books from the db, it returns a promise that when fulfilled it will trigger the proper actions to
 * update the status.
 *
 * @returns {function(*): Promise<Object>}
 * @promise {dispatch(action(json))}
 * @error {dispatch(action(error))}
 */
export function fetchBooks() {
  return function (dispatch) {
    dispatch(requestData(ResourceType.BOOKS, RequestScope.ALL));
    return fetch(bookServiceUrl + "books")
      .then(
        json => dispatch(receiveData(ResourceType.BOOKS, RequestScope.ALL, json)),
        error => dispatch(requestError(ResourceType.BOOKS, error)),
      );
  };
}

/**
 * To retrieve the authors from the db, it returns a promise that when fulfilled it will trigger the proper actions to
 * update the status.
 *
 * @returns {function(*): Promise<Object>}
 * @promise {dispatch(action(json))}
 * @error {dispatch(action(error))}
 */
export function fetchAuthors() {
  return function (dispatch) {
    dispatch(requestData(ResourceType.AUTHORS, RequestScope.ALL));
    return fetch(bookServiceUrl + "authors")
      .then(
        json => dispatch(receiveData(ResourceType.AUTHORS, RequestScope.ALL, json)),
        error => dispatch(requestError(ResourceType.AUTHORS, error))
      );
  };
}

/**
 * To search an isbn from the open-library, it returns a promise that when fulfilled, it will trigger the proper actions
 * to update the status with the returned data.
 *
 * @param isbn to search
 * @returns {function(*): Promise<Object>}
 * @promise {dispatch(action(json))}
 * @error {dispatch(action(error))}
 */
export function searchIsbn(isbn) {
  return function (dispatch) {
    dispatch(requestData(ResourceType.SEARCH), RequestScope.ONE);
    return fetch(openLibraryUrl + "isbn=" + isbn)
      .then(
        json => dispatch(receiveData(ResourceType.SEARCH, RequestScope.ONE, json, isbn)),
        error => dispatch(requestError(ResourceType.SEARCH, error)),
      );
  };
}

export function addBook(book) {
  console.log(book);
  return function (dispatch, getState) {
    dispatch(requestData(ResourceType.BOOKS, RequestScope.ONE));
    return fetch(bookServiceUrl + "books",
      {
        method: "post",
        body: JSON.stringify(book),
        headers: {
          Accept: APPLICATION_JSON,
          "Content-Type": APPLICATION_JSON,
        }
      })
      .then(
        json => {
          if (shouldDataReload(json, getState().libraryServiceId)) {
            dispatch(fetchBooks());
          } else {
            dispatch(
              receiveData(
                ResourceType.BOOKS,
                RequestScope.ONE,
                json,
                {
                  books: getState().books,
                  authors: getState().authors,
                }
              )
            );
          }
        },
        error => dispatch(requestError(ResourceType.BOOKS, error))
      );
  };
}

/*
fetch helper methods
 */
function shouldDataReload(serviceResponse, currentChangeId) {
  return serviceResponse.hasOwnProperty("lastChangeId") && serviceResponse.lastChangeId !== currentChangeId;
}