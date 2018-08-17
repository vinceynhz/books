import Book from "components/Book";
import React from "react";
import PropTypes from "prop-types";

const BookList = ({books}) => (
  <ul>
    {Object.keys(books).map(bookId => <Book key={bookId} id={bookId} book={books[bookId]}/>)}
  </ul>
);

BookList.propTypes = {
  books: PropTypes.object.isRequired,
};

export default BookList;