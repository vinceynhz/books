import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route, BrowserRouter as Router} from "react-router-dom";

import {AuthorCount, BookCount} from "containers/Counters";
import ErrorMessage from "containers/ErrorMessage";
import OrderedBooks from "containers/books/OrderedBooks";
import OrderedAuthors from "containers/authors/OrderedAuthors";

import {fetchAuthors, fetchBooks} from "lib/actions";
import barcodeListener from "lib/BarcodeScannerListener";

const Home = () => (
  <div>
    <BookCount/>
    <AuthorCount/>
  </div>
);

const Topic = ({match}) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({match}) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li><Link to={`${match.url}/rendering`}>Rendering</Link></li>
      <li><Link to={`${match.url}/components`}>Components</Link></li>
      <li><Link to={`${match.url}/props`}>Props</Link></li>
    </ul>
    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic</h3>
    )}/>
  </div>
);

class App extends Component {
  componentDidMount() {
    // (event) => barcodeListener(event, (isbn) => this.props.dispatch(searchIsbn(isbn)))
    document.addEventListener(
      "keydown",
      (event) => barcodeListener(event, undefined),
      true
    );
    this.props.dispatch(fetchBooks());
    this.props.dispatch(fetchAuthors());
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/books"}>Books by Title</Link></li>
            <li><Link to={"/authors"}>Books by Author</Link></li>
          </ul>

          <ErrorMessage/>

          <hr/>

          <Route exact path={"/"} component={Home}/>
          <Route path={"/books"} component={OrderedBooks}/>
          <Route path={"/authors"} component={OrderedAuthors}/>

        </div>
      </Router>
    );
  }
}

export default connect()(App);
