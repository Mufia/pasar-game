import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/login");
      window.alert("Anda telah log out")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Pasar Game</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          {currentUser?.isAdmin && (
            <>
            <Link className="link" to="/admin/user">User</Link>
            <Link className="link" to="/admin/posts">Post</Link>
            <Link className="link" to="/admin/orders">Order</Link>
            </>
          )}
          
          {/*<Link className="link" to="/cara">Tata Cara</Link>*/}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/myposts">
                        Iklan Saya
                      </Link>
                      <Link className="link" to="/add">
                        Buat Iklan
                      </Link>
                    </>
                  )}
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                  <Link className="link" to="/chat">
                     Chat
                  </Link>
                  {
                    currentUser.isAdmin ? ""
                    : <Link className="link" to="/orders">
                        Orders
                      </Link>
                  }

                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Masuk</Link>
              <Link className="link" to="/register">
                <button>Daftar</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
