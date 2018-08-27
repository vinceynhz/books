import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Count = ({updating, lastUpdate, count, type}) => (
  <div>{updating ? "Updating..." : `${count} ${type} in the library. Last update at ${lastUpdate.toISOString()}`}</div>
);

Count.propTypes = {
  updating: PropTypes.bool,
  lastUpdate: PropTypes.instanceOf(Date).isRequired,
  count: PropTypes.number,
  type: PropTypes.string.isRequired,
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

const mapAuthorsState = state => ({
  updating: state.updatingAuthors,
  lastUpdate: state.lastAuthorsUpdate,
  count: Object.keys(state.authors).length,
  type: "authors",
});

export const BookCount = connect(mapBooksState)(Count);
export const AuthorCount = connect(mapAuthorsState)(Count);