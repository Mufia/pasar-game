import React, { useEffect, useRef, useState } from "react";
import "./AllPosts.scss";
import PostCard from "../../components/postCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function AllPosts() {
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      newRequest
        .get(
          `/posts`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  const number = data?.length;

  const empty = number === 0 ;

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="posts">
      <div className="container">
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data?.map((post) => <PostCard key={post._id} item={post} />)
            }
        </div>
      </div>
    </div>
  );
}

export default AllPosts;
