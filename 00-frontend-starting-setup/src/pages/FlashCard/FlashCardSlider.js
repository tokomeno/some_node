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
  nextCard = () => {
    this.setState(prevState => ({
      current:
        this.state.current >= this.props.flashCards.length
          ? 1
          : prevState.current + 1
    }));
  };
  prevCard = () => {
    this.setState(prevState => ({
      current:
        this.state.current !== 1
          ? prevState.current - 1
          : this.props.flashCards.length
    }));
  };
  render() {
    const flashCards = this.props.flashCards;
    const currentCard = flashCards[this.state.current - 1];
    return (
      <React.Fragment>
        <FlashCard flashCard={currentCard} key={currentCard.id} />
        <nav className="flashcard__navigation">
          <button onClick={this.prevCard}>
            <span> {"<"} </span>
          </button>
          <span className="page__num">
            {this.state.current}/{flashCards.length}
          </span>
          <button onClick={this.nextCard}>
            {" "}
            <span> {">"} </span>
          </button>
        </nav>
      </React.Fragment>
    );
  }
}
FlashCardSlider.propTypes = {
  flashCards: PropTypes.array.isRequired
};

export default FlashCardSlider;
