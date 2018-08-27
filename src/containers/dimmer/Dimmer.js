import Loading from "components/icon/Loading";
import {toggleDimmer} from "lib/actions";
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import "./Dimmer.css";

let element;

class Dimmer extends Component {
  componentDidMount() {
    element = document.getElementsByClassName("dimmer");
    if (element.length > 0) {
      element = element[0];
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.open === prevProps.open) return;
    this._toggle(element);
  }

  _toggle = () => {
    if (this.props.open) {
      element.classList.remove("out");
      element.classList.add("in");
    } else {
      element.classList.remove("in");
      element.classList.add("out");
    }
  };

  render() {
    const className = "dimmer";
    return (
      <div className={className} onClick={this.props.onClick}>
        <Loading/>
      </div>
    );
  }
}

Dimmer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  open: state.dimmerOpen,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(toggleDimmer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dimmer);