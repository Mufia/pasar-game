import React, { useReducer, useState } from "react";
import "./Add.scss";
import { postReducer, INITIAL_STATE } from "../../reducers/postReducer.js";
import upload from "../../utils/upload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser.username)

  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (post) => {
      return newRequest.post("/posts", post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPost"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    //navigate("/myposts")
  };


  return (
    <div className="add">
      <div className="container">
        <h1>Tambah Iklan Baru</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Judul Iklan</label>
            <input
              type="text"
              name="title"
              placeholder="Judul Iklan"
              onChange={handleChange}
            />
            <label htmlFor="">Judul Game</label>
            <select name="cat" id="cat" onChange={handleChange}>
            <option value=" "> </option>
              <option value="genshin">Genshin Impact</option>
              <option value="hsr">Honkai Star Rail</option>
              <option value="arknights">Arknights</option>
              <option value="fgo">Fate Grand Order</option>
              <option value="coc">Clash Of Clans</option>
              <option value="dn2e">Dragon Nest 2 Evolution</option>
              <option value="mlbb">Mobile Legends</option>
              <option value="pubg">PUBG</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Detail Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Deskripsi Akun</label>
            <textarea
              name="desc"
              id=""
              placeholder="Deskripsi"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            
          </div>
          <div className="details">
            <label htmlFor="">Harga</label>
            <input type="number" placeholder="Rp" onChange={handleChange} name="price" />
            <button onClick={handleSubmit}>Buat Iklan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
