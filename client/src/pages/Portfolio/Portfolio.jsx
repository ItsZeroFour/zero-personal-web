import React from "react";
import style from "./Portfolio.module.scss";
import PortfolioTop from "./PortfolioTop/PortfolioTop";
import WhyMe from "./WhyMe/WhyMe";
import Projects from "./Projects/Projects";

const Posts = () => {
  return (
    <main className={style.portfolio}>
      <PortfolioTop />
      <WhyMe />
      <Projects />
    </main>
  );
};

export default Posts;
