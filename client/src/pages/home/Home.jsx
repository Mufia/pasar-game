import React, { useEffect, useState } from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import GameCard from "../../components/gameCard/GameCard";
import { cards } from "../../data";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import PostCard from "../../components/postCard/PostCard";



function Home() {

  const [games, setGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);


  useEffect(() => {
    const getGames = async () => {
      try {
        const res = await newRequest.get("/game");
        setGames(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGames();
  }, []);

  console.log(games)
  
  useEffect(() => {
    const getPopularGames = async () => {
      try {
        const res = await newRequest.get("/game/popular");
        setPopularGames(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPopularGames();
  }, []);

  console.log(popularGames)

  return (
    <div className="home">
      <Featured />
      <h1>Popular Games</h1>
      <h1>Semua Game</h1>
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="cards">
        {games.map((g) => (
          <GameCard games = {g}/>
        ))}
      </div>

    </div>
  );
}

export default Home;
