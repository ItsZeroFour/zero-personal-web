import React, { useEffect, useState } from "react";
import style from "./CreateProject.module.scss";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [githubRepoLink, setGithubRepoLink] = useState("");
  const [stackImage, setStackImage] = useState("");
  const [stackName, setStackName] = useState("");
  const [loading, setLoading] = useState(false);

  const [stacks, setStacks] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useSelector((state) => state.auth);

  const isEditing = Boolean(id);
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

      setStackImage(data.url);
    } catch (err) {
      console.log(err);
      toast("Failerd dile upload");
    }
  };

  /*
    Push to the array object with stack value
  */
  const createStack = (event) => {
    event.preventDefault();

    stacks.push({
      stackImage,
      stackName,
    });

    setStackName("");
    setStackImage("");
  };

  /*
    If we want to create project, not update,
    create variable with all fields and send its
    to backend 
  */
  const createProjectOnSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (!title || !text || !githubRepoLink || stacks.length === 0) {
        return toast("Failed to create project");
      }

      const fields = {
        title,
        text,
        githubRepoLink,
        stacks,
      };

      isEditing
        ? await axios.patch(`/projects/${id}`, fields)
        : await axios.post("/projects", fields);

      navigate("/portfolio");
    } catch (err) {
      console.log(err);
      toast("Can't create project");
    }
  };

  /*
    If we get id - get one project with this id
    and get fields from his.
  */
  useEffect(() => {
    if (id) {
      axios
        .get(`/projects/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setGithubRepoLink(data.githubRepoLink);
          setStacks(data.stacks);
        })
        .catch((err) => {
          console.log(err);
          toast("Can't get projects");
        });
    }
  }, [id]);

  /*
    Get index of element witch we wand to delete
    then get all indexes of elements and delete them.
    Then save new array to state
  */
  const deleteStackOnClick = (index_) => {
    const deleteStack = stacks.filter((el, index) => index !== index_);
    setStacks(deleteStack);
  };

  if (!isAuth || data?.email !== "itsZeroFourX@gmail.com") {
    return <Navigate to={`/portfolio`} />;
  }

  return (
    <main className={style.createProject}>
      <h2>Cretae project</h2>

      <form onSubmit={createProjectOnSubmit}>
        <div className={style.createProject__text__input}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Text"
          />
          <input
            type="text"
            value={githubRepoLink}
            onChange={(event) => setGithubRepoLink(event.target.value)}
            placeholder="Github repo link"
          />
        </div>

        <div className={style.createProject__stacks}>
          <input
            id="project-stack"
            type="file"
            onChange={handleChangeFile}
            accept=".jpg, .png, .jpeg, .svg"
            hidden
          />
          <label htmlFor="project-stack">stack image</label>
          <input
            type="text"
            value={stackName}
            onChange={(event) => setStackName(event.target.value)}
            placeholder="Stack name"
          />

          <button onClick={createStack}>Add stack</button>
        </div>

        {stackImage !== "" && (
          <div className={style.createProject__stack__create}>
            <img src={`${process.env.REACT_APP_API_URL}${stackImage}`} alt={stackName} />
            <p>{stackName}</p>
          </div>
        )}

        {stacks.map((item, index) => (
          <div key={index} className={style.createProject__stack__create}>
            <img
              src={`${process.env.REACT_APP_API_URL}${item.stackImage}`}
              alt={item.stackName}
            />
            <p>{item.stackName}</p>
            <FontAwesomeIcon
              onClick={() => deleteStackOnClick(index)}
              icon={faClose}
            />
          </div>
        ))}

        {isEditing ? (
          <button
            className={style.createProject__submit__button}
            type="submit"
            disabled={loading}
          >
            {loading ? "Porject saving..." : "Save project"}
          </button>
        ) : (
          <button
            className={style.createProject__submit__button}
            type="submit"
            disabled={loading}
          >
            {loading ? "Porject saving..." : "Create project"}
          </button>
        )}
      </form>
    </main>
  );
};

export default CreateProject;
