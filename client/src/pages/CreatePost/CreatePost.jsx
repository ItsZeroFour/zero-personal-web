import React, { useState } from "react";
import style from "./CreatePost.module.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import Markdown from "../../components/Markdown/Markdown";

const CreatePost = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [thematic, setThematic] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { data } = useSelector((state) => state.auth);
  const isAuth = useSelector(selectIsAuth);

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

      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
      toast("Failerd dile upload");
    }
  };

  const onClickRemoverImage = () => {
    if (window.confirm("Are you sure you want to delete this image?"))
      setImageUrl("");
  };

  /*
    Create post and send us to this post page
    If we have an error send notificate
  */
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const fields = {
        title,
        text,
        thematic,
        imageUrl,
        tags,
      };

      const { data } = await axios.post("/posts", fields);

      const id = data._id;
      console.log("Post created successfully");

      navigate(`/posts/:${id}`);
    } catch (err) {
      console.error(err);
      toast("Couldn't create post");
    }
  };

  if (!isAuth || data?.email !== "itsZeroFourX@gmail.com") {
    return <Navigate to={`/blog`} />;
  }

  return (
    <main className={style.createPost}>
      <form>
        {imageUrl === "" ? (
          <>
            <input
              id="create-post-img"
              type="file"
              onChange={handleChangeFile}
              hidden
              accept=".jpg, .png, .jpeg"
            />
            <label htmlFor="create-post-img">Загрузить изоброжение</label>
          </>
        ) : (
          <>
            <img
              className={style.createPost__image}
              src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
              alt="post img"
            />
            <button
              className={style.createPost__delete__image}
              onClick={onClickRemoverImage}
            >
              Delete image
            </button>
          </>
        )}

        <input
          className={style.createPost__title}
          type="text"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          placeholder="Title"
        />

        <Markdown setText={setText} text={text} />

        <input
          className={style.createPost__thematic}
          type="text"
          onChange={(event) => setThematic(event.target.value)}
          value={thematic}
          placeholder="Thematic"
        />
        <input
          className={style.createPost__tags}
          type="text"
          onChange={(event) => setTags(event.target.value)}
          value={tags}
          placeholder="Tags"
        />

        <button type="submit" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Статься создается..." : "Создать статью"}
        </button>
      </form>
    </main>
  );
};

export default CreatePost;
