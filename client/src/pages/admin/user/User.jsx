import React from 'react'
import "./User.scss"
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../../utils/newRequest';





const User = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users`).then((res) => {
        return res.data;
      }),
  });


  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/users/admin/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className='user'>
      {currentUser?.isAdmin && (
        <>
        <div className="container">
          <div className="title">
            <h1>Daftar Pengguna</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>Email</th>
              <th>Penjual</th>
              <th>Aksi</th>
            </tr>
            {data?.map((user) => (
              <tr key={user._id}>
                <td className='propic'>
                  <img 
                  className='image'
                  src={user.img || "/img/noavatar.jpg"} alt="" />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {
                    user.isSeller? 
                    <img src="/img/greencheck.png" alt="seller" />
                    : <img src="/img/redx.png" alt="" />
                  }
                </td>
                <td>
                  <img 
                  className='delete'
                  src="/img/delete.png"
                  alt="" 
                  onClick={() => handleDelete(user._id)}/>
                </td>
              </tr>
            ))}
          </table>
          {/*<table>
            <thead>Seller</thead>
            <tr>
            <th>Image</th>
              <th>Username</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
            {seller?.map((seller) => (
              <tr key={seller._id}>
                <td className='propic'>
                  <img 
                  className='image'
                  src={seller.img || "/img/noavatar.jpg"} alt="" />
                </td>
                <td>{seller.username}</td>
                <td>{seller.email}</td>
                <td>
                  <img 
                  className='delete'
                  src="/img/delete.png"
                  alt="" />
                </td>
              </tr>
            ))}
            </table>*/}
        </div>
        </>
      )}
    </div>
  )
}

export default User;