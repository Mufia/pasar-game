import React from "react";
import { Link } from "react-router-dom";
import "./MyPosts.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import FormatRupiah from "../../utils/formatRupiah";

function MyPosts() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myPosts"],
    queryFn: () =>
      newRequest.get(`/posts?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  console.log(data)

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPosts"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const soldMutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/posts/sold/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPosts"]);
    },
  });

 const handleSold = (id) => {
    soldMutation.mutate(id);
    window.location.reload();
  }

  return (
    <div className="myPosts">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Iklan Saya</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Tambah iklan</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            {data.map((post) => (
              <tr key={post._id}>
                <td>
                  <img className="image" src={post.cover} alt="" />
                </td>
                <td><Link to={`/post/${post._id}`} className="link">{post.title}</Link></td>
                <td><FormatRupiah value={post.price}/></td>
                <td className="action">
                  {
                    post.isSold ? " " :
                    <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(post._id)}
                  />
                  }
                  
                  {
                    post?.isSold ? 
                    <span>Terjual</span> :
                    <button onClick={() => handleSold(post._id)}>Terjual</button>
                  }
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyPosts;
