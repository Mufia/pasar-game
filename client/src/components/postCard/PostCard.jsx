import React from "react";
import "./PostCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import FormatRupiah from "../../utils/formatRupiah";

const PostCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/post/${item._id}`} className="link">
      <div className="postCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <h4>{item.title}</h4>
        </div>
        <hr />
        <div className="detail">

          <div className="price">
            <h2><FormatRupiah value={item.price} /></h2>
          </div>
          {item.isSold? <h3 className="sold">[Terjual]</h3>
            : "" }
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
