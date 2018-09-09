import React from "react";
import {connect} from "react-redux";

const ServiceId = ({libraryServiceId}) => (
  <div>Library Service Id: {libraryServiceId}</div>
);

const mapStateToProps = state => ({
  libraryServiceId: state.libraryServiceId,
});

export default connect(mapStateToProps)(ServiceId);
