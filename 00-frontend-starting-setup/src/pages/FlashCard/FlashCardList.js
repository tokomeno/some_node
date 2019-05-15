import React, { Component } from "react";
import FlashCard from "./FlashCard";

import PropTypes from "prop-types";
class FlashCardList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.flashCards.map(card => {
          return <FlashCard flashCard={card} key={card.id} />;
        })}
      </React.Fragment>
    );
  }
}
FlashCardList.propTypes = {
  flashCards: PropTypes.array.isRequired
};

export default FlashCardList;
