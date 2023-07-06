import React, { useEffect, useState } from "react";
import style from "./Blog.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/posts";
import ReactPaginate from "react-paginate";
import Post from "./Post/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Blog = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts } = useSelector((state) => state.posts);
  // const { comments } = useSelector((state) => state.comments);

  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 10;
  const pageCount = Math.ceil(posts.items.length / postPerPage);

  const pageVisited = pageNumber * postPerPage;

  const isPostsLoading = posts.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const postItems = [...posts.items].reverse();

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <main className={style.blog}>
      {userData && userData.email === "itsZeroFourX@gmail.com" && (
        <NavLink className={style.blog__create__button} to="/blog/create-post">
          Create Post
        </NavLink>
      )}

      <section className={style.blog__section}>
        {(isPostsLoading
          ? [...Array(5)]
          : postItems.slice(pageVisited, pageVisited + postPerPage)
        ).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              text={obj.text}
              thematic={obj.thematic}
              imageUrl={obj.imageUrl}
              viewsCount={obj.viewsCount}
              commentsCount={obj.comments.length}
              tags={obj.tags}
              isEditable={userData?._id === obj.user?._id}
              isLoading={false}
            />
          )
        )}
      </section>

      <ReactPaginate
        breakLabel="..."
        nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
        previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
        pageClassName={style.blog__page}
        breakClassName={style.blog__page__break}
        pageLinkClassName={style.blog__page__link}
        activeClassName={style.blog__page__active}
        containerClassName={style.blog__page__container}
      />
    </main>
  );
};

export default Blog;
