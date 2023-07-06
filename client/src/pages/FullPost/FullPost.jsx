import React, { useCallback, useEffect, useState } from "react";
import style from "./FullPost.module.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEye,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import baseAvatar from "../../images/main/avatar.svg";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchRemovePost } from "../../redux/slices/posts";
import CommentSceleton from "./CommentsSceleton/Comment.Sceleton";
import {
  fetchCreateComment,
  fetchGetPostComments,
} from "../../redux/slices/comment";

const FullPost = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();
  const { comments } = useSelector((state) => state.comments);
  const data_ = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let commentsLength = comments.length;

  /*
    Notificate user with question "sure his want to remove post"
    If hi sure - remove post and navigate to blog page
    If hi not sure - nothing doing
  */
  const onClickRemovePost = () => {
    if (window.confirm("Are you sure you want to remove this post?")) {
      dispatch(fetchRemovePost(id));
      navigate("/blog");
    }
  };

  /*
    Transport post id and text of comment then set comment
    value to empty and notificate user about successfully
    comment created
  */
  const createComment = () => {
    try {
      dispatch(fetchCreateComment({ postId: id, comment }));

      setComment("");
      toast("Comment created successfully!");
    } catch (err) {
      console.log(err);
      toast("Can't create comment");
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      dispatch(fetchGetPostComments(id));

      setCommentsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [id, dispatch]);

  /*
    Get current post with id and set data to state
    If error - notoficate user about it
  */
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast("Error getting article");
      });
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // console.log(commentsLength);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={style.fullPost}>
      {data.imageUrl && (
        <img
          src={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ""}
          alt="post"
        />
      )}

      <div className={style.fullPost__main__info}>
        <div className={style.fullPost__text}>
          <h5>{data.thematic}</h5>
          <h2>{data.title}</h2>
          <article>
            <ReactMarkdown children={data.text} />
          </article>

          <div className={style.fullPost__other}>
            <p className={style.post__other__views}>
              <FontAwesomeIcon icon={faEye} /> {data.viewsCount}
            </p>
            <p className={style.post__other__comments}>
              <FontAwesomeIcon icon={faComment} /> {data.commentsCount}{" "}
              {commentsLength}
            </p>
          </div>
        </div>

        <div className={style.fullPost__tags}>
          {data_.length !== 0 &&
            data_.data.email === "itsZeroFourX@gmail.com" && (
              <div className={style.fullPost__buttons}>
                <button
                  className={style.fullPost__delete__button}
                  onClick={onClickRemovePost}
                >
                  Delete post <FontAwesomeIcon icon={faTrash} />
                </button>

                <NavLink
                  className={style.fullPost__edit__button}
                  to={`/posts/${id}/edit`}
                >
                  Edit post <FontAwesomeIcon icon={faPen} />
                </NavLink>
              </div>
            )}

          <ul className={style.fullPost__tags__list}>
            {data.tags.map((item) => (
              <li key={item + Math.random()}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={style.fullPost__comments}>
        <h3>Comments</h3>

        {commentsLoading ? (
          <CommentSceleton />
        ) : (
          <>
            <div className={style.fullPost__comments__create}>
              <img
                src={
                  data_.length !== 0 && data_.data.avatarUrl
                    ? `${process.env.REACT_APP_API_URL}${data_.data.avatarUrl}`
                    : baseAvatar
                }
                alt="user avatar"
              />

              {data_.length !== 0 && (
                <form onSubmit={(event) => event.preventDefault()}>
                  <h3>{data_.data.firstName + " " + data_.data.lastName}</h3>
                  <input
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Type something..."
                  />
                  <button type="submit" onClick={createComment}>
                    Send
                  </button>
                </form>
              )}
            </div>

            <ul className={style.fullPost__comments__list}>
              {[...comments].reverse().map((data) => (
                <li>
                  <img
                    src={
                      data.author?.avatarUrl
                        ? `${process.env.REACT_APP_API_URL}${data.author.avatarUrl}`
                        : baseAvatar
                    }
                    alt="user avatar"
                  />

                  <div className={style.fullPost__comments__text}>
                    <div className={style.fullPost__comments__text__text}>
                      <h3>
                        {typeof data.author === "string"
                          ? data_.data.firstName + " " + data_.data.lastName
                          : data.author
                          ? data.author.firstName + " " + data.author.lastName
                          : "No name"}
                      </h3>
                      <p>{data.comment}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
};

export default FullPost;
