import {fetchBooks, fetchAuthors} from "lib/actions";
import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Count = ({updating, lastUpdate, count, type, onClick}) => (
  <div
    onClick={onClick}>{updating ? "Updating..." : `${count} ${type} in the library. Last update at ${lastUpdate.toISOString()}`}</div>
);

Count.propTypes = {
  updating: PropTypes.bool,
  lastUpdate: PropTypes.instanceOf(Date).isRequired,
  count: PropTypes.number,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Count.defaultProps = {
  updating: false,
  count: 0,
};

const mapBooksState = state => ({
  updating: state.updatingBooks,
  lastUpdate: state.lastBooksUpdate,
  count: Object.keys(state.books).length,
  type: "books",
});

const mapBooksDispatch = dispatch => ({
  onClick: () => dispatch(fetchBooks()),
});

const mapAuthorsState = state => ({
  updating: state.updatingAuthors,
  lastUpdate: state.lastAuthorsUpdate,
  count: Object.keys(state.authors).length,
  type: "authors",
});

const mapAuthorsDispatch = dispatch => ({
  onClick: () => dispatch(fetchAuthors()),
});

export const BookCount = connect(mapBooksState, mapBooksDispatch)(Count);
export const AuthorCount = connect(mapAuthorsState, mapAuthorsDispatch)(Count);