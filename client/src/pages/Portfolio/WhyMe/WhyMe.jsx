import React from "react";
import style from "./WhyMe.module.scss";
import whymeimg from "../../../images/portfolio/whyme_humen.svg";
import teacher from "../../../images/portfolio/teacher.png";
import finger from "../../../images/portfolio/finger.png";
import books from "../../../images/portfolio/books.png";

const WhyMe = () => {
  return (
    <section className={style.whyme}>
      <div className={style.whyme__left}>
        <h2>Why exectly me?</h2>
        <img src={whymeimg} alt="why me img" />
      </div>

      <ul className={style.whyme__right__list}>
        {[
          {
            title: "Love learning",
            text: "I like learning something new. What interests me - I will study with great pleasure.",
            img: teacher,
          },
          {
            title: "Problem solving",
            text: "I will always find a solution to the problem! I will not give up on the case while I solve the problem that is associated with it. (Optional development)",
            img: finger,
          },
          {
            title: "Self improvement",
            text: "Each of my new projects surpasses the previous one! In new projects, I introduce something new or modify chips from the previous one.",
            img: books,
          },
        ].map(({ title, text, img }) => (
          <li key={text + Math.random()}>
            <div className={style.whyme__right__img}>
              <img src={img} alt={title} />
            </div>

            <div className={style.whyme__right__text}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyMe;
