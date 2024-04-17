import React from 'react'
import "./AdminOrders.scss"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import moment from "moment"
import FormatRupiah from "../../../utils/formatRupiah";

const AdminOrders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders/admin`).then((res) => {
        return res.data;
      }),
  });

  console.log(data)

  const mutation = useMutation ({
    mutationFn: (orderId) => {
      return newRequest.post(`/chat/group/${orderId}`);
    },
    onSucces : () => {
      queryClient.invalidateQueries(["order"])
    }
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/orders/cancel/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order"]);
    },
  });

  const handleCancel = (id) => {
    cancelMutation.mutate(id);
    window.location.reload();
  };
  
  const handleGroupchat = async (orderId) => {
    try {
      const res = await newRequest.get(`/chat/single/group/${orderId}`);
      navigate(`/chat`)
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/chat/group/${orderId}`)
        navigate(`/chat`)
      }
    }
  }


  return (
    <div className='adminOrders'>
      {currentUser?.isAdmin && (
        <>
        <div className="container">
          <div className="title">
            <h1>Daftar Order</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Post Title</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
            {data?.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className='image' src={order.img} alt="" />
                </td>
                <td><Link to={`/post/${order.postId}`} className="link">
                  <td>{order.title}</td>
                </Link></td>
                <td>{order.buyerId?.username || "user deleted"}</td>
                <td>{order.sellerId?.username || "user deleted"}</td>
                <td><FormatRupiah value={order.price}/></td>
              <td className='status'>
                  {
                    order.isCompleted?
                    <span>Pesanan Selesai</span>
                    : order.onProcess?
                    <>
                    <button onClick={() => handleGroupchat(order._id)}>Group Chat</button>
                    <button className='cancel' onClick={() => handleCancel(order._id)} >Cancel</button>
                    </>
                    : order.isCanceled? 
                    <span>Pesanan Dibatalkan</span>
                    :"Menunggu Konfirmasi"
                    
                  }
                </td>
                <td></td>
              </tr>
            ))}
          </table>
        </div>
        </>
      )}
    </div>
  )
}

export default AdminOrders;