import OrderedAuthors from "containers/authors/OrderedAuthors";
import React from "react";
import {connect} from "react-redux";
import {Route} from "react-router-dom";

const AuthorsController = ({match}) => (
  <div>
    <Route exact path={match.path} component={OrderedAuthors}/>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  match: ownProps.match,
});

export default connect(mapStateToProps)(AuthorsController);