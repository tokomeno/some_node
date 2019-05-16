import React, { Component } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

class FlashCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBack: false
    };
  }
  toggleCard = () => {
    this.setState(prevState => ({ activeBack: !this.state.activeBack }));
  };
  render() {
    const { question, answer } = this.props.flashCard;
    return (
      <div
        className={classnames("card", {
          flipme: this.state.activeBack
        })}
        onClick={this.toggleCard}
      >
        <div className="card__content">
          <div className="card__front">
            <p className="card__subtitle">{question}</p>
          </div>

          <div className="card__back">
            <p className="card__subtitle">{answer} </p>
          </div>
        </div>
      </div>
    );
  }
}
FlashCard.propTypes = {
  flashCard: PropTypes.object.isRequired
};

export default FlashCard;
