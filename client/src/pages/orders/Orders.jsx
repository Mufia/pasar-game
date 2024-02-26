import React,{useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const isSeller = currentUser?.isSeller;
  
  const queryClient = useQueryClient();
  
  const navigate = useNavigate();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });
   console.log(data)

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
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

  const confirmMutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/orders/confirm/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order"]);
    },
  });

  const handleConfirm = (id) => {
    confirmMutation.mutate(id);
    window.location.reload();
  };

  const completeMutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/orders/complete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order"]);
    },
  });

  const handleComplete = (id) => {
    completeMutation.mutate(id);
    window.location.reload();
  };

  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
            {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td><Link to={`/post/${order.postId}`} className="link">{order.title}</Link></td>
                <td>{order.price}</td>
                <td>
                {!currentUser.isSeller && (
                    <>
                      {
                        order.isCompleted?
                        <span>Pesanan Selesai</span>
                        : order.onProcces? 
                        <button onClick={() => handleComplete(order._id)} >Selesaikan Pesanan</button>
                        : <span>Menunggu Konfirmasi</span>
                      }
                    </>
                  )}
                  {currentUser.isSeller && (
                    <>
                      {
                        order.isCompleted?
                        <span>Pesanan Selesai</span>
                        : order.onProcces? 
                        <span>Sedang Proses</span>
                        : <button onClick={() => handleConfirm(order._id)}>Konfirmasi</button>
                      }
                    </>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
