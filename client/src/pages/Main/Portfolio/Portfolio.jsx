import React, { useEffect } from "react";
import style from "./Portfolio.module.scss";
import list from "../../../images/blog/blog-list.svg";
import { NavLink } from "react-router-dom";
import Project from "../../Portfolio/Projects/Project/Project";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../redux/slices/projects";
import { selectIsAuth } from "../../../redux/slices/auth";
import SceletonProject from "../../Portfolio/Projects/SceletonProject/SceletonProject";

const Portfolio = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  const isProjectsLoading = projects.status === "loading";

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <section className={style.portfolio}>
      <h2 className={style.portfolio__title}>Portfolio</h2>

      {!isProjectsLoading ? (
        <ul className={style.portfolio__container}>
          {projects.items.slice(0, 4).map((data_, index) => (
            <Project
              key={index}
              id={data_._id}
              isLoading={isProjectsLoading}
              title={data_.title}
              text={data_.text}
              githubRepoLink={data_.githubRepoLink}
              stacks={data_.stacks}
              stars={data_.stars}
              isAuth={isAuth}
              email={data?.email}
            />
          ))}
        </ul>
      ) : (
        <SceletonProject />
      )}

      <div className={style.portfolio__link}>
        <NavLink to="/portfolio">
          <img src={list} alt="list" /> See more
        </NavLink>
      </div>
    </section>
  );
};

export default Portfolio;
