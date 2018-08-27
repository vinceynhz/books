import React from "react";
import {connect} from "react-redux";

const ErrorMessage = ({message}) => (
  <div style={{color: "red"}}>{message}</div>
);

const mapStateToProps = state => ({
  message: state.errorMessage,
});

export default connect(mapStateToProps)(ErrorMessage);
