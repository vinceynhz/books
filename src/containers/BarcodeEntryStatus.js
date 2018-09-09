import React from "react";
import {connect} from "react-redux";

const BarcodeEntryStatus = ({capturingBarcode}) => (
  <div>Barcode status: {capturingBarcode ? "capturing" : "idle"}</div>
);

const mapStateToProps = state => ({
  capturingBarcode: state.capturingBarcode,
});

export default connect(mapStateToProps)(BarcodeEntryStatus);
