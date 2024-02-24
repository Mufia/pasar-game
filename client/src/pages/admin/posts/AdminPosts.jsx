import React from 'react'
import "./AdminPosts.scss"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../../utils/newRequest';
import { Link } from "react-router-dom";

const AdminPosts = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      newRequest.get(`/posts/admin`).then((res) => {
        return res.data;
      }),
  });

  console.log(data)


  return (
    <div className='adminPosts'>
      {currentUser?.isAdmin && (
        <>
        <div className="container">
          <div className="title">
            <h1>Daftar Post</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Seller Id</th>
              <th>Status</th>
            </tr>
            {data?.map((post) => (
              <tr key={post._id}>
                <td>
                  <img className='image' src={post.cover} alt="" />
                </td>
                <Link to={`/post/${post._id}`} className="link">
                  <td>{post.title}</td>
                </Link>
                <td>{post.userId}</td>
                <td>
                  {
                    post.isSold? 
                    <span>Terjual</span>
                    : "Belum Terjual"
                  }
                </td>
                 
               
              </tr>
            ))}
          </table>
        </div>
        </>
      ) }
    </div>
  )
}

export default AdminPosts;