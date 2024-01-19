import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/posts?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Pusat Jual Beli  <span>Akun</span> Game 
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Cari Akun Game'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Genshin Impact</button>
            <button>Arknight</button>
            <button>Honkai Star Rail</button>
            <button>FGO</button>
          </div>
        </div>
        <div className="right">
          <img src="https://upload-os-bbs.hoyolab.com/upload/2020/01/24/1093585/80dc253249450a3ae610205242a0ac0f_1844027884249063044.png?x-oss-process=image/auto-orient,0/interlace,1/format,png" alt="img"/>
        </div>
      </div>
    </div>
  );
}

export default Featured;
