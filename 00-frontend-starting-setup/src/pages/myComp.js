import React, { Component } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import FlashCardSlider from "./FlashCard/FlashCardSlider";
import TermList from "./Term/TermList";

export default class Home extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      cards: [
        { id: 1, question: "1 how ary", answer: "f1 ind" },
        { id: 2, question: "2 how ary", answer: "2 find" },
        { id: 3, question: "3 how ary", answer: "3 find" }
      ],
      current: 1
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <FlashCardSlider flashCards={this.state.cards} />
            <TermList terms={this.state.cards} />
          </div>
        </div>
      </div>
    );
  }
}
