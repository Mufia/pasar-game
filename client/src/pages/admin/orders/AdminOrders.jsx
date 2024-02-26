import React from 'react'
import "./AdminOrders.scss"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

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
  
  const handleGroupchat = async (orderId) => {
    try {
      const res = await newRequest.get(`/chat/single/group${orderId}`);
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
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
            {data?.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className='image' src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  {
                    order.isCompleted?
                    <span>PesananSelesai</span>
                    : order.onProcces?
                    <button onClick={() => handleGroupchat(order._id)}>Group Chat</button>
                    : "Menunggu Konfirmasi"
                  }
                </td>
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