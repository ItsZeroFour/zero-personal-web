import React from "react";
import style from "./PortfolioTop.module.scss";
import smile1 from "../../../images/portfolio/smile1.png";
import smile2 from "../../../images/portfolio/smile2.png";
import smile3 from "../../../images/portfolio/smile3.png";
import cv from "../../../download/resume_daniil_andreev.pdf";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const PortfolioTop = () => {
  return (
    <section className={style.portfolio__top}>
      <div className={style.portfolio__top__text}>
        <h2>Portfolio</h2>

        <p>
          The skills that I have. Including <span>development</span>
        </p>

        <p className={style.portfolio__top__textline}>
          I am interested in everything that interests me. I can cook food, I
          like to <span>travel</span>, <span>develop websites</span> and do
          other <span>computer technologies</span>
        </p>
      </div>

      <div>
        <div className={style.portfolio__top__skills}>
          {[
            {
              title: "Web Development",
              text: "I have been into web development since 2021.",
              img: smile1,
            },
            {
              title: "Traveling",
              text: "I like to travel to interesting places and learn something new.",
              img: smile2,
            },
            {
              title: "Computer techologies",
              text: "I actively follow computer technologies from an early age.",
              img: smile3,
            },
          ].map(({ title, text, img }) => (
            <div
              className={style.portfolio__top__skill}
              key={text + Math.random()}
            >
              <div className={style.portfolio__top__skill__title}>
                <img src={img} alt="emoji" />
                <h3>{title}</h3>
              </div>

              <div className={style.portfolio__top__skill__text}>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={style.portfolio__download}>
          <a href={cv} download={cv}>
            <FontAwesomeIcon icon={faDownload} /> Download my CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioTop;
