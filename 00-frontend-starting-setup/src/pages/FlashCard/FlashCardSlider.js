import React, { Component } from "react";
import FlashCard from "./FlashCard";

import PropTypes from "prop-types";
class FlashCardSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1
    };
  }
  render() {
    const currentCard = this.state.flashCard[this.state.current - 1];
    return (
      <React.Fragment>
        <FlashCard flashCard={currentCard} key={currentCard.id} />;
      </React.Fragment>
    );
  }
}
FlashCardSlider.propTypes = {
  flashCards: PropTypes.array.isRequired
};

export default FlashCardSlider;
