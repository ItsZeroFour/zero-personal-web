import React, { useEffect, useState } from "react";
import style from "./Projects.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../../redux/slices/auth";
import { NavLink } from "react-router-dom";
import { fetchProjects } from "../../../redux/slices/projects";
import Project from "./Project/Project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
  const [searchTerm, setSetsearchTerm] = useState("");
  const [projectsData, setProjectsData] = useState([]);
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  const isProjectsLoading = projects.status === "loading";

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    setProjectsData(projects.items);
  }, [projects]);

  /*
    If searchText is empty - return full array
    Else: Get all titles from projects and make his to lower case
    and check are there any matches it with our search text
    If includes - return new array
  */
  const filterProjects = (searchText, listOfProjects) => {
    if (!searchText) {
      return listOfProjects;
    }

    return listOfProjects.filter(({ title }) =>
      title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  /*
    Make timeout with 300ms timeout and in this timeout create variable
    with filterProjects function. This function transfer search term and
    not filtered array. Then set new array to state and clear timeout
  */
  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredProjects = filterProjects(searchTerm, projects.items);
      setProjectsData(filteredProjects);
    }, 300);

    return () => clearTimeout(Debounce);
  }, [searchTerm, projects.items]);

  return (
    <section className={style.projects}>
      <h2>Projects</h2>

      <label htmlFor="search-project-input">Search project</label>

      <div className={style.projects__input}>
        <input
          className={style.projects__search__input}
          id="search-project-input"
          type="text"
          value={searchTerm}
          onChange={(event) => setSetsearchTerm(event.target.value)}
          placeholder="Type project name here, hehehe ....."
        />
      </div>

      <ul className={style.projects__list}>
        {projectsData.map((data_, index) =>
          isProjectsLoading ? (
            <Project key={index} isLoading={isProjectsLoading} />
          ) : (
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
          )
        )}
      </ul>

      <div className={style.projects__link}>
        {isAuth && data.email === "itsZeroFourX@gmail.com" && (
          <NavLink to="/projects/create">
            Add project <FontAwesomeIcon icon={faPlus} />
          </NavLink>
        )}
      </div>
    </section>
  );
};

export default Projects;
