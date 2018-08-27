import BookList from "components/books/BookList";
import {selectBook} from "lib/actions";
import {connect} from "react-redux";

const mapStateToProps = state => ({
  books: state.books,
  orderedBooks: state.orderedBooks,
  selectedBook: state.selectedBook,
});

const mapDispatchToPros = dispatch => ({
  onSelectBook: id => dispatch(selectBook(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToPros,
)(BookList);