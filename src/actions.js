/*
action types
 */

export const ADD_BOOK = "ADD_BOOK";

export const BookFormat = {
  HARD_COVER: "HC",
  PAPER_BACK: "PB",
};

/*
action creators
 */
let nextId = 0;
export const addBook = (book) => ({
  type: ADD_BOOK,
  id: nextId++,
  book
});
