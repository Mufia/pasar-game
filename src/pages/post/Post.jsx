import React from "react";
import "./Post.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, json, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import WaButton from "../../components/waButton/WaButton";
import FormatRupiah from "../../utils/formatRupiah";

function Post() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  console.log(currentUser);

  const { id } = useParams();

  const { isLoading, error, data, pesan} = useQuery({
    queryKey: ["post"],
    queryFn: () =>
      newRequest.get(`/posts/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data)


  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  

  const message = (`Halo, saya tertarik dengan akun  yang anda tawarkan di Pasar Game`);

  return (
    <div className="post">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2><FormatRupiah value={data.price}/></h2>
            <h2>Deskripsi</h2>
            <pre>{data.desc}</pre>
            
            
          </div>
          <div className="right">
          {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>Penjual</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {
                      !currentUser? <p>Silahkan login untuk menghubungi penjual</p> : currentUser.isSeller? <p>Silahkan login dengan akun user untuk menghubugni penjual</p> : <WaButton phoneNumber={dataUser.phone} message={message}/>   
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
