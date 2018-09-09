import {connect} from "react-redux";
import history from "lib/history";

import BookForm from "components/books/BookForm";

const mapStateToProps = (state, ownProps) => {
  let bookData = {};

  if (Object.keys(state.books).length > 0 && Object.keys(state.authors).length > 0) {
    bookData = Object.assign(bookData, state.books[ownProps.match.params["bookId"]]);
    if (bookData) {
      bookData.authors = bookData.authors.map(authorId => state.authors[authorId].name);
    }
  }

  return {
    bookData: bookData,
    actionLegend: "Save changes",
    loading: state.updatingBooks || state.updatingAuthors,
  };
};

const mapDispatchToProps = dispatch => ({
  onOk: book => console.log(book),
  onCancel: () => history.push("/"),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);