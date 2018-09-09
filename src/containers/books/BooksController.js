import EditBook from "containers/books/EditBook";
import React from "react";
import {connect} from "react-redux";
import {Route} from "react-router-dom";

import AddBook from "containers/books/AddBook";
import OrderedBooks from "containers/books/OrderedBooks";


const BooksController = ({match}) => (
  <div>
    <Route path={`${match.path}/add`} component={AddBook}/>
    <Route path={`${match.path}/edit/:bookId`} component={EditBook}/>
    <Route exact path={match.path} component={OrderedBooks}/>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  match: ownProps.match,
});

export default connect(mapStateToProps)(BooksController);