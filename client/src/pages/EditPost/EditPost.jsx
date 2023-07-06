import React, { useEffect, useState } from "react";
import style from "./EditPost.module.scss";
import Markdown from "../../components/Markdown/Markdown";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { selectIsAuth } from "../../redux/slices/auth";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [thematic, setThematic] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wait, setWait] = useState(true);

  const { data } = useSelector((state) => state.auth);

  const navigate = useNavigate(data);
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);

  /*
    If we get correct data - set false to state
  */
  useEffect(() => {
    if (data) {
      setWait(false);
    }
  }, [data]);

  /*
    if we get correct id - get current post and set his data
    to states. If we get an error - notificate user about it
  */
  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags);
          setThematic(data.thematic);
        })
        .catch((err) => {
          console.log(err);
          toast("Article loading error");
        });
    }
  }, []);

  /*
    Get fields and update post with new fields
    If we get an error - notificate user about it
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

      await axios.patch(`/posts/${id}`, fields);

      navigate(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      toast("Article editing error");
    }
  };

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

  if (!isAuth || !wait || data.email !== "itsZeroFourX@gmail.com") {
    return <Navigate to={`/blog`} />;
  }

  return (
    <main className={style.editpost}>
      <form onSubmit={onSubmit}>
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
              className={style.editpost__image}
              src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
              alt="post img"
            />
            <button
              className={style.editpost__delete__image}
              onClick={onClickRemoverImage}
            >
              Delete image
            </button>
          </>
        )}

        <input
          className={style.editpost__title}
          type="text"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          placeholder="Title"
        />

        <Markdown setText={setText} text={text} />

        <input
          className={style.editpost__thematic}
          type="text"
          onChange={(event) => setThematic(event.target.value)}
          value={thematic}
          placeholder="Thematic"
        />
        <input
          className={style.editpost__tags}
          type="text"
          onChange={(event) => setTags(event.target.value)}
          value={tags}
          placeholder="Tags"
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Статься сохраняется..." : "Изменить статью"}
        </button>
      </form>
    </main>
  );
};

export default EditPost;
