import React from "react";
import style from "./NotFound.module.scss";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <main className={style.error__page}>
      <div className={style.content}>
        <h2 className={style.header} data-text="404">
          404
        </h2>
        <h4 data-text="Opps! Page not found">Opps! Page not found.</h4>
        <p>
          Sorry, the page you're looking for doesn't exist. If you think
          something is broken, report a problem.
        </p>
        <div className={style.btns}>
          <NavLink to="/">return home</NavLink>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
