import React from "react";
import { Link } from "react-router-dom";
import "./GameCard.scss";

function GameCard({ games}) {
  return (
    <div className="gameCard">
    <Link to={`/posts?cat=${games.cat}`} className="link">
        <img src={games.icon} alt=" "/>
        <span className="title">{games.title}</span>
    </Link>
    </div>
  );
}
export default GameCard;
