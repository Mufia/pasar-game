import React, { useEffect, useState } from "react";
import "./Post.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import WaButton from "../../components/waButton/WaButton";
import FormatRupiah from "../../utils/formatRupiah";

function Post() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('')
  const [userId, setUserId] = useState('')
  const { id } = useParams();

  const { isLoading, error, data} = useQuery({
    queryKey: ["post"],
    queryFn: () =>
      newRequest.get(`/posts/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const isSold = data?.isSold;
  const user = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${user}`).then((res) => {
        return res.data;
      }),
    enabled: !!user,
  });



  const message = (`Halo, saya tertarik dengan akun ${data?.title} yang anda tawarkan di Pasar Game`);

  console.log(data)
  const postId = data?._id;
  console.log(postId)
  useEffect(() => {
    if (currentUser && data) {
      const combinedOrderId = currentUser._id + data._id;
      setOrderId(combinedOrderId);
    }
  }, [currentUser, data])

  const handleOrder = async () => {
    try {
      const res = await newRequest.get(`/orders/single/${encodeURIComponent(orderId)}`)
      navigate(`/orders`)
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/orders/${postId}`)
        navigate(`/orders`)
      }
    }
  }

  useEffect (() => {
    if (currentUser && data) {
      const combinedUserId = currentUser._id + data.userId;
      setUserId (combinedUserId);
    }
  })

  console.log(userId)

  const handleChat = async () => {
    try {
      const res = await newRequest.get(`/chat/single/${userId}`)
      navigate(`/chat`)
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/chat/${postId}`)
        navigate(`/chat`)
      }
    }
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
                      isSold ? 
                      <h3>Akun ini telah Terjual</h3> :
                      !currentUser? 
                      <p>Silahkan login untuk menghubungi penjual</p> 
                      : currentUser.isSeller? 
                      <p>Silahkan login dengan akun user untuk menghubugni penjual</p> 
                      : <div className="button">
                        {/*<WaButton phoneNumber={dataUser.phone} message={message}/>*/}
                        <button onClick={handleChat}>Chat</button>
                        <button onClick={handleOrder} >Pesan Sekarang</button>
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