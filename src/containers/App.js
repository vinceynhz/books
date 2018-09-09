import ServiceId from "containers/ServiceId";
import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route, Router} from "react-router-dom";

import AuthorsController from "containers/authors/AuthorsController";
import {AuthorCount, BookCount} from "containers/Counters";
import BarcodeEntryStatus from "containers/BarcodeEntryStatus";
import BooksController from "containers/books/BooksController";
import ErrorMessage from "containers/ErrorMessage";
import SearchController from "containers/search/SearchController";

import history from "lib/history";
import {startBarcodeEntry, endBarcodeEntry, fetchBooks, fetchAuthors} from "lib/actions";
import barcodeListener from "lib/BarcodeScannerListener";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBooks());
    this.props.dispatch(fetchAuthors());
    document.addEventListener(
      "keydown",
      (event) => barcodeListener(
        event,
        (isbn) => history.push("/search?isbn=" + isbn),  // onCapture
        () => this.props.dispatch(startBarcodeEntry()),  // onStart
        () => this.props.dispatch(endBarcodeEntry())     // onEnd
      ),
      true
    );
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/books"}>Books</Link></li>
            <li><Link to={"/authors"}>Authors</Link></li>
          </ul>
          <BookCount/>
          <AuthorCount/>
          <ErrorMessage/>
          <BarcodeEntryStatus/>
          <ServiceId/>
          <hr/>
          <Route exact path={"/"} render={() => <br/>}/>
          <Route path={"/search"} component={SearchController}/>
          <Route path={"/books"} component={BooksController}/>
          <Route path={"/authors"} component={AuthorsController}/>
        </div>
      </Router>
    );
  }
}

export default connect()(App);