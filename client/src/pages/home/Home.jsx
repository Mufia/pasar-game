import React, { useEffect, useState } from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import GameCard from "../../components/gameCard/GameCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";



function Home() {

  const [games, setGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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

  
  useEffect(() => {
    const getPopularGames = async () => {
      try {
        const res = await newRequest.get("/game/popular");
        setPopularGames(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getPopularGames();
  }, []);

  if (currentUser?.isAdmin) {
    console.log(games)
    console.log(popularGames)
  }

  return (
    <div className="home">
      <Featured />
      {/*<h1>Popular Games</h1>*/}
      {/*
        loading ? (
          <h1>Loading....</h1>
        ) : (
          <Slide slidesToShow={5} arrowsScroll={5}>
            {popularGames.map((p) => (
            <CatCard key={p.id} popularGames={p} />
            ))}
          </Slide>
        )
      */}
      
      <h1>Semua Game</h1>
      {
        loading ? (
          <h1>Loading....</h1>
        ) : (
          <div className="cards" >
          {games.map((g) => (
            <GameCard games = {g} key={g._id}/>
          ))}
        </div>
        )
      }
    </div>
  );
}

export default Home;
