import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ popularGames }) {
  return (
    <Link to={`/posts?cat=${popularGames.cat}`}>
      <div className="catCard">
        <img src={popularGames.img} alt="" />
        <span className="title">{popularGames.title}</span>
      </div>
    </Link>
  );
}
export default CatCard;
