import React, { useEffect, useState } from "react";
import style from "./Reviews.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

const Reviews = ({ isAuth }) => {
  const [reviews, setReviews] = useState(null);
  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("/reviews/getAll")
      .then((data) => setReviews(data))
      .catch((err) => {
        toast("Failed to get all reviews");
        console.log(err);
      });
  }, []);

  const deleteReview = async (event) => {
    event.preventDefault();

    try {
      await axios.delete("/reviews/delete");

      toast("Successfully deleted review");
    } catch (err) {
      console.log(err);
      toast("Failed to delete review");
    }
  };

  return (
    <main className={style.reviews}>
      {isAuth && data?.email === "itsZeroFourX@gmail.com" && (
        <Link className={style.reviews__link} to="/reviews/create">
          Create review
        </Link>
      )}

      <section>
        {reviews && reviews.data ? (
          <ul className={style.reviews__list}>
            {reviews.data.map((item) => (
              <li>
                <img
                  src={process.env.REACT_APP_API_URL + item.image}
                  alt="review"
                />

                <div className={style.reviews__stars}>
                  <div>
                    {[...Array(item.stars)].map(() => (
                      <FontAwesomeIcon icon={faStar} />
                    ))}
                  </div>

                  {isAuth && data.email === "itsZeroFourX@gmail.com" && (
                    <button onClick={deleteReview}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>

                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h2>Loading...</h2>
        )}
      </section>
    </main>
  );
};

export default Reviews;
