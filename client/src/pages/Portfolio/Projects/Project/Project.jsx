import React, { useEffect, useState } from "react";
import style from "./Project.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  fetchRemoveProject,
} from "../../../../redux/slices/projects";
import axios from "../../../../utils/axios";
import { toast } from "react-toastify";
import SceletonProject from "../SceletonProject/SceletonProject";

const Project = ({
  isLoading,
  title,
  text,
  githubRepoLink,
  stacks,
  id,
  stars,
  isAuth,
  email,
}) => {
  const [idInLikeArray, setIdInLikeArray] = useState(false);
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClickRemoveProject = () => {
    if (window.confirm("Are you sure you want to remove this project?")) {
      dispatch(fetchRemoveProject(id));
    }
  };

  /*
    Check if data and stars arrays it true -
    check if user id already has in liked array
  */
  useEffect(() => {
    if (data && stars) setIdInLikeArray(stars.indexOf(data._id) !== -1);
  }, [data, stars]);

  /*
    Check if user is not authenticated - return his on this function
    If user Authentication - check if user not liked project -
    add his id to liked array and update values (dispatch). If user already
    liked this project - remove his id from liked array and update values (dispatch)

    Then, if we do anything whith this functions - notificate user about it
  */
  const likeProject = async () => {
    if (!isAuth) {
      return;
    }

    if (!idInLikeArray) {
      await axios.put(`/projects/like/${id}`);
      dispatch(fetchProjects());
      toast("You have successfully subscribed!");
    } else {
      await axios.put(`/projects/dislike/${id}`);
      dispatch(fetchProjects());
      toast("You have successfully unsubscribed!");
    }
  };

  return (
    <>
      {!isLoading ? (
        <li className={style.projects__item}>
          <a
            className={style.projects__item__text}
            href={githubRepoLink}
            target="_blank"
            rel="noreferrer"
          >
            <div className={style.projects__item__text__text}>
              <h3>{title}</h3>

              <p>{text}</p>
            </div>

            {isAuth && email === "itsZeroFourX@gmail.com" && (
              <div className={style.projects__item__buttons}>
                <button onClick={onClickRemoveProject}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>

                <button>
                  <NavLink to={`/projects/create/:${id}`}>
                    <FontAwesomeIcon icon={faPen} />
                  </NavLink>
                </button>
              </div>
            )}
          </a>

          <div className={style.projects__item__bottom}>
            <ul className={style.projects__stacks}>
              {stacks.map((item) => (
                <li key={item}>
                  <img
                    src={`http://localhost:4444${item.stackImage}`}
                    alt={item.stackName}
                  />
                </li>
              ))}
            </ul>

            <div
              className={style.projects__item__buttons}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className={style.projects__item__stars}
                onClick={likeProject}
                style={
                  idInLikeArray ? { color: "#cadc00" } : { color: "#fbfbfb" }
                }
              >
                <p>{[...new Set(stars)].length}</p>
                <FontAwesomeIcon icon={faStar} />
              </button>
            </div>
          </div>
        </li>
      ) : (
        <SceletonProject />
      )}
    </>
  );
};

export default Project;
