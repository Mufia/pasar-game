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

  const { id } = useParams();

  const { isLoading, error, data} = useQuery({
    queryKey: ["post"],
    queryFn: () =>
      newRequest.get(`/posts/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const isSold = data?.isSold;
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




  const message = (`Halo, saya tertarik dengan akun ${data?.title} yang anda tawarkan di Pasar Game`);

  const handleContact = async (order) => {
    const sellerId = dataUser._id;
    const buyerId = currentUser._id;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  const handleOrder = async (post) => {

  }

  return (
    <div className="post">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <div className="title">
              <h1>{data.title}</h1>
              {isSold ? <h1 className="sold">[Terjual]</h1> : " " }
            </div>
            {/*isLoadingUser ? (
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
              </div>
            )*/}
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
                      isSold ? <h3>Akun ini telah Terjual</h3> :
                      !currentUser? 
                      <p>Silahkan login untuk menghubungi penjual</p> 
                      : currentUser.isSeller? 
                      <p>Silahkan login dengan akun user untuk menghubugni penjual</p> 
                      : <div className="button">
                        <WaButton phoneNumber={dataUser.phone} message={message}/>
                        <button>Chat</button>
                        <button>Pesan Sekarang</button>
                        </div>
                         
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
