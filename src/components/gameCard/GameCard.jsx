import React from "react";
import { Link } from "react-router-dom";
import "./GameCard.scss";

function GameCard({ card }) {
  return (
    <div className="gameCard">
    <Link to={`/posts?cat=${card.cat}`} className="link">
        <img src={card.icon} alt=" "/>
        <span className="title">{card.title}</span>
    </Link>
    </div>
  );
}
export default GameCard;
