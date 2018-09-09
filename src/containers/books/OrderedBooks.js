import {connect} from "react-redux";

import {ResourceType, selectResource} from "lib/actions";

import BookList from "components/books/BookList";

const mapStateToProps = state => ({
  books: state.books,
  authors: state.authors,
  orderedBooks: state.orderedBooks,
  selectedBook: state.selectedBook,
  editPath: "/books/edit",
  deletePath: "/books/delete",
});

const mapDispatchToPros = dispatch => ({
  onSelectBook: id => dispatch(selectResource(ResourceType.BOOKS, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToPros,
)(BookList);