import React from "react";
import style from "./Post.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faComment, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PostSceleton from "../PostSceleton/PostSceleton";

const Post = ({
  id,
  title,
  text,
  thematic,
  imageUrl,
  viewsCount,
  commentsCount,
  tags,
  isLoading,
}) => {

  return (
    <>
      {!isLoading ? (
        <NavLink className={style.post} to={`/posts/:${id}`}>
          <div className={style.post__main}>
            {imageUrl && (
              <img src={`http://localhost:4444${imageUrl}`} alt="post img" />
            )}

            <div className={style.post__text}>
              <h5>{thematic}</h5>
              <h2>{title}</h2>
              <ReactMarkdown
                children={
                  text.length > 200 ? `${text.substring(0, 200)}...` : text
                }
              />
            </div>
          </div>

          <div className={style.post__other}>
            <p className={style.post__other__views}>
              <FontAwesomeIcon icon={faEye} /> {viewsCount}
            </p>
            <p className={style.post__other__comments}>
              <FontAwesomeIcon icon={faComment} /> {commentsCount}
            </p>
            <div className={style.post__other__tags}>
              <FontAwesomeIcon icon={faHashtag} />{" "}
              <div>
                {tags.map((item) => (
                  <p key={item + Math.random()}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </NavLink>
      ) : (
        <div className={style.post__seleton}>
          <PostSceleton />
        </div>
      )}
    </>
  );
};

export default Post;
