import {combineReducers} from "redux";

import {
  RECEIVE_AUTHORS,
  RECEIVE_BOOKS,
  REQUEST_AUTHORS,
  REQUEST_BOOKS,
  REQUEST_ERROR, SELECT_AUTHOR,
  SELECT_BOOK,
  TOGGLE_DIMMER,
} from "lib/actions";

/*
misc functions
 */

// function hashOf(string) {
//   let hash = 0, i, chr;
//   if (string.length === 0) return hash;
//   for (i = 0; i < string.length; i++) {
//     chr = string.charCodeAt(i);
//     hash = ((hash << 5) - hash) + chr;
//     hash &= 0xFFFFFF; // Convert to 32bit integer
//   }
//   return hash;
// }

function charSum(string) {
  let sum = 0, i, chr;
  if (string.length === 0) return sum;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    sum = (sum + (chr >> 2)) << 7;
    sum &= 0xFFFFFF;
  }
  return sum;
}

function hexFromHash(hashNumber) {
  return "#" + (hashNumber + 64).toString(16).padEnd(6, "0");
}

function initials(bookAuthor) {
  let words = bookAuthor.split(" ", 2);
  return (words.length > 1)
    ? (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
    : (words[0].charAt(0) + words[0].charAt(1)).toUpperCase();
}

// function cleanString(string) {
//   let result = "";
//   let upperCase = string.toUpperCase();
//   let length = upperCase.length;
//   let cc;
//   for (let i = 0; i < length; i++) {
//     cc = upperCase.charCodeAt(i);
//     if ((48 <= cc && cc <= 57) || (65 <= cc && cc <= 90)) {
//       result += upperCase.charAt(i);
//     }
//   }
//   return result;
// }

/*
State of the whole application:
{
  lastBooksUpdate: Date,
  lastAuthorsUpdate: Date,
  updating: false,
  selectedBook: id,
  dimmerOpen: false,
  errorMessage: '',
  books : {
    id: {
      title: "whatever",
      author: ["", ""],
      year: "1234",
      format: "HC",
      isbn: "cscds",
      avatarColor: "#123456",
      initials: "AB",
    },
    other-id: {
      title: "whatever",
      author: ["", ""],
      year: "1234",
      format: "HC",
      isbn: "cscds",
      avatarColor: "#123456",
      initials: "AB",
    }
  },
  authors : {
    author_name: [book_id_1, book_id_2, book_id_3],
    other_name: [book_id_4, book_id_5, book_id_6],
  },
  orderedBooks : [],
  orderedAuthors : [],
}
 */

/*
book related states
 */
function updatingBooks(state = false, action) {
  switch (action.type) {
    case REQUEST_BOOKS:
      return true;
    case RECEIVE_BOOKS:
    case REQUEST_ERROR:
      return false;
    default:
      return state;
  }
}

function lastBooksUpdate(state = new Date(0), action) {
  switch (action.type) {
    case RECEIVE_BOOKS:
      return action.timestamp;
    default:
      return state;
  }
}

function orderedBooks(state = [], action) {
  switch (action.type) {
    case RECEIVE_BOOKS:
      return action.jsonBooks
        .slice()
        .sort((a, b) => a.orderingTitle.localeCompare(b.orderingTitle))
        .map(book => book.id);
    default:
      return state;
  }
}

function books(state = {}, action) {
  switch (action.type) {
    case RECEIVE_BOOKS:
      let newBooks = {};
      action.jsonBooks.forEach(book => {
        newBooks[book.id] = Object.assign(
          {},
          book,
          {
            initials: book.author.length > 0 ? initials(book.author[0]) : "",
            avatarColor: book.author.length > 0 ? hexFromHash(charSum(book.author[0])) : "#000",
          }
        );
      });
      return newBooks;
    default:
      return state;
  }
}

function selectedBook(state = "", action) {
  switch (action.type) {
    case SELECT_BOOK:
      return (state === action.id) ? "" : action.id;
    default:
      return state;
  }
}


/*
author related states
 */
function updatingAuthors(state = false, action) {
  switch (action.type) {
    case REQUEST_BOOKS:
    case REQUEST_AUTHORS:
      return true;
    case RECEIVE_BOOKS:
    case RECEIVE_AUTHORS:
    case REQUEST_ERROR:
      return false;
    default:
      return state;
  }
}

function lastAuthorsUpdate(state = new Date(0), action) {
  switch (action.type) {
    case RECEIVE_BOOKS:
    case RECEIVE_AUTHORS:
      return action.timestamp;
    default:
      return state;
  }
}

function orderedAuthors(state = [], action) {
  switch (action.type) {
    case RECEIVE_AUTHORS:
      return action.jsonAuthors
        .slice()
        .sort((a, b) => a.orderingName.localeCompare(b.orderingName))
        .map(author => author.id);
    default:
      return state;
  }
}

function authors(state = {}, action) {
  switch (action.type) {
    case RECEIVE_AUTHORS:
      let newAuthors = {};
      action.jsonAuthors.forEach(author => {
        newAuthors[author.id] = Object.assign(
          {},
          author
        );
      });
      return newAuthors;
    default:
      return state;
  }
}

function selectedAuthor(state = "", action) {
  switch (action.type) {
    case SELECT_AUTHOR:
      return (state === action.id) ? "" : action.id;
    default:
      return state;
  }
}

/*
error related states
 */
function errorMessage(state = "", action) {
  switch (action.type) {
    case REQUEST_ERROR:
      return action.error.message;
    default:
      return state;
  }
}

/*
internal states
 */
function dimmerOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_DIMMER:
      return !state;
    default:
      return state;
  }
}

const bookApp = combineReducers({
  updatingBooks,
  lastBooksUpdate,
  orderedBooks,
  books,
  selectedBook,

  updatingAuthors,
  lastAuthorsUpdate,
  authors,
  orderedAuthors,
  selectedAuthor,

  errorMessage,
  dimmerOpen,
});

export default bookApp;