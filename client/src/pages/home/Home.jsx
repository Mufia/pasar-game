import React from "react";
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

/*  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      newRequest.get("/posts")
        .then((res) => {
          return res.data;
        }),
  });*/
  
  
  return (
    <div className="home">
      <Featured />
      <h1>Popular Games</h1>
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <h1>Semua Game</h1>
      <div className="cards">
        {cards.map((card) => (
          <GameCard key={card.id} card={card}/>
        ))}
      </div>

    </div>
  );
}

export default Home;
