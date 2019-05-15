import React, { Component } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import FlashCardList from "./FlashCard/FlashCardList";
import FlashCard from "./FlashCard/FlashCard";

export default class myComp extends Component {
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

  nextCard = () => {
    if (this.state.current >= this.state.cards.length) {
      console.log(this.state.current);
      return;
    }
    this.setState(prevState => ({
      current: prevState.current + 1
    }));
    console.log(this.state.current);
  };
  prevCard = () => {
    if (this.state.current === 1) {
      return;
    }
    this.setState(prevState => ({
      current: prevState.current - 1
    }));
  };

  render() {
    return (
      <div>
        <FlashCardList flashCards={this.state.cards} />
        {/* ////////////////// */}
        {/* <div className="card">
          <div className="card__content">
            <div className="card__front">
              <h3 className="card__title">The Fair</h3>
              <p className="card__subtitle">Lorem ipsum dolor sit. </p>
            </div>

            <div className="card__back">
              <p className="card__subtitle">Lorem ipsum dolor sit. </p>
            </div>
          </div>
        </div> */}
        {/*  */}
        {/* {this.state.current} */}
        {/* {this.state.cards.map(card => {
          return (
            <Card
              card={card}
              key={card.front}
              nextCard={this.nextCard}
              prevCard={this.prevCard}
            />
          );
        })} */}
        {/* <Card
          card={this.state.cards[this.state.current - 1]}
          nextCard={this.nextCard}
          prevCard={this.prevCard}
        /> */}
      </div>
    );
  }
}

class Card extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      front: false
    };
  }
  render() {
    const { card } = this.props;
    return (
      <div>
        <div
          className="flip-container"
          id="flashcard"
          onClick={() => {
            this.setState(prevState => ({
              front: !prevState.front
            }));
          }}
        >
          {/* some */}
          <div className="flipper flippable">
            <div className={classnames("front", { flipme: this.state.front })}>
              <span id="flashcard--content_en">{card.front}</span>
            </div>
            {/*  */}
            <div className={classnames("back", { flipme: !this.state.front })}>
              <span id="flashcard--content_es">{card.back}</span>
            </div>
          </div>
          {/* some */}
        </div>
        <button onClick={this.props.prevCard}> Prev</button>

        <button onClick={this.props.nextCard}> Next</button>
      </div>
    );
  }
}
