import React from "react";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";

import AlphabeticNavigation, {alphabetizeIds} from "components/AlphabeticNavigation";

import {selectAuthor} from "lib/actions";
import {AuthorPropType} from "lib/PropTypeDefs";

function nameForDisplay(name) {
  let words = name.split(" ");
  return words[words.length - 1] + ", " + words.slice(0, words.length - 1).join(" ");
}

const SimpleBook = ({book}) => (
  <div>
    <p>Title: {book.title}</p>
  </div>
);

const Author = ({id, author, books, selected, onSelectAuthor}) => {
  const visibleBooks = selected
    ? author.books.map(bookId => <SimpleBook key={bookId} book={books[bookId]}/>)
    : null;
  return (<div onClick={() => onSelectAuthor(id)}>
    <p>Author: {nameForDisplay(author.name)}</p>
    {visibleBooks}
  </div>);
};

Author.propTypes = {
  id: PropTypes.string.isRequired,
  author: AuthorPropType,
  books: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelectAuthor: PropTypes.func.isRequired,
};

const AuthorList = ({authors, books, orderedAuthors, selectedAuthor, onSelectAuthor}) => {
  let authorsAndHs = alphabetizeIds(orderedAuthors, authors, "orderingName",
    (authorId, author) => <Author key={authorId}
                                  id={authorId}
                                  author={author}
                                  books={books}
                                  selected={selectedAuthor === authorId}
                                  onSelectAuthor={onSelectAuthor}/>
  );
  return (
    <div>
      {orderedAuthors.length === 0 && <div>No authors to show :S</div>}
      {orderedAuthors.length >= 0 && <AlphabeticNavigation/>}
      {authorsAndHs}
    </div>
  );
};

const mapStateToProps = state => ({
  authors: state.authors,
  books: state.books,
  orderedAuthors: state.orderedAuthors,
  selectedAuthor: state.selectedAuthor,
});

const mapDispatchToPros = dispatch => ({
  onSelectAuthor: id => dispatch(selectAuthor(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(AuthorList);