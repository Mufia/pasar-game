import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    phone: "",
    isSeller: false,
    desc: "",
  });
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.phone.trim() === '') {
      // Input is empty
      alert('Nomor telepon masih kosong');
      return;
  }

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      setMessage(response.data);
      setMessageColor("green");
      //navigate("/login")
    } catch (error) {
      setMessage(error.response?.data || "An error occurred.");
      setMessageColor("red");
      console.log(error); 
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Buat Akun Baru</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          
          <button type="submit">Daftar</button>
          {message && <p style={{ color: messageColor }}>{message}</p>}
        </div>
        <div className="right">
          <h1>Saya Ingin Menjadi Penjual</h1>
          <div className="toggle">
            <label htmlFor="">Jadi Penjual</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Nomor Telepon</label>
          <input
            name="phone"
            type="text"
            placeholder="62xxxxxxxx   (Gunakan kode negara tanpa +)"
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
    
  );
}

export default Register;
