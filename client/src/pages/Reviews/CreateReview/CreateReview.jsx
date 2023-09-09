import React, { useState } from "react";
import style from "../Reviews.module.scss";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";

const CreateReview = ({ isAuth }) => {
  const [image, setImage] = useState("");
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");

  const { data } = useSelector((state) => state.auth);

  /*
    Get file and send it to the server
    If we get an error send notification
  */
  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);

      setImage(data.url);
    } catch (err) {
      console.log(err);
      toast("Failed to upload image");
    }
  };

  const createReview = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/reviews/create", {
        image,
        stars,
        text,
      });

      return <Navigate to="/reviews" />;
    } catch (err) {
      console.log(err);
      toast("Failed to create review");
    }
  };

  if (!isAuth || data?.email !== "itsZeroFourX@gmail.com") {
    return <Navigate to={`/reviews`} />;
  }

  return (
    <main className={style.create__review}>
      <form>
        {!image ? (
          <div className={style.create__review__image}>
            <label htmlFor="review-image">Upload image</label>
            <input
              type="file"
              id="review-image"
              hidden
              onChange={handleChangeFile}
            />
          </div>
        ) : (
          <div className={style.create__review__image}>
            <img src={process.env.REACT_APP_API_URL + image} alt="review" />
            <button onClick={() => setImage("")}>Remove image</button>
          </div>
        )}

        <input
          className={style.create__review__input__first}
          type="number"
          onChange={(event) => setStars(event.target.value)}
          value={stars}
          min={1}
          max={5}
          placeholder="Stars"
        />
        <textarea
          className={style.create__review__input__textarea}
          type="text"
          onChange={(event) => setText(event.target.value)}
          value={text}
          placeholder="Text"
        />

        <button className={style.create__review__create} onClick={createReview}>
          Create Review
        </button>
      </form>
    </main>
  );
};

export default CreateReview;
