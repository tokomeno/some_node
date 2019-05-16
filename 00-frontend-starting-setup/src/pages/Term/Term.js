import React, { Component } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

class Term extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { question, answer } = this.props.term;
    return (
      <div className="term__container">
        <div className="left">{question}</div>
        <div className="right">{answer}</div>
      </div>
    );
  }
}
Term.propTypes = {
  term: PropTypes.object.isRequired
};

export default Term;
