import React, { Component } from "react";
import Term from "./Term";

import PropTypes from "prop-types";
class TermList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.terms.map(term => {
          return <Term term={term} key={term.id} />;
        })}
      </React.Fragment>
    );
  }
}
TermList.propTypes = {
  terms: PropTypes.array.isRequired
};

export default TermList;
