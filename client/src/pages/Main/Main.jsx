import React from "react";
import style from "./Main.module.scss";
import Biography from "./Biography/Biography";
import Stack from "./Stack/Stack";
import Blog from "./Blog/Blog";
import Portfolio from "./Portfolio/Portfolio";

const Main = () => {
  return (
    <main className={style.main}>
      <h1 className={style.main__heading}>
        Hi Im Daniil, a special human with some ability to love learning and
        working on teamwork.
      </h1>

      <Biography />
      <Stack />
      <Blog />
      <Portfolio />
    </main>
  );
};

export default Main;
