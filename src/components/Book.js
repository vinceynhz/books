import React from "react";
import PropTypes from "prop-types";
import {BookPropType} from "lib/PropTypeDefs";

const Book = ({book, id}) => (
  <li id={id}>
    <p>Title: {book.title}</p>
    <p>ISBN: {book.isbn}</p>
    <p>Year: {book.year}</p>
  </li>
);

Book.propTypes = {
  book: BookPropType,
  id: PropTypes.string.isRequired,
};

export default Book;