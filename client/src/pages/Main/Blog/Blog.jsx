import React, { useEffect } from "react";
import style from "./Blog.module.scss";
import list from "../../../images/blog/blog-list.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../redux/slices/posts";
import PostSceleton from "../../Blog/PostSceleton/PostSceleton";

const Blog = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const postItems = [...posts.items].reverse();

  return (
    <section className={style.blog}>
      <h2 className={style.blog__title}>My blog</h2>

      {isPostsLoading ? (
        <PostSceleton />
      ) : (
        postItems.slice(0, 2).map((data) => (
          <div className={style.blog__element}>
            <div className={style.blog__element__image}>
              {data.imageUrl && (
                <img
                  src={`${process.env.REACT_APP_API_URL}${data.imageUrl}`}
                  alt="blog img"
                />
              )}
            </div>

            <div className={style.blog__element__info}>
              <h4>{data.thematic}</h4>

              <h2>{data.title}</h2>

              <p>{data.text}</p>
            </div>
          </div>
        ))
      )}

      <div className={style.blog__link}>
        <NavLink to="/blog">
          <img src={list} alt="list" /> See more
        </NavLink>
      </div>
    </section>
  );
};

export default Blog;
