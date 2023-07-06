import React from "react";
import style from "./Biography.module.scss";
import avatar from "../../../images/main/avatar.svg";
import vk from "../../../images/main/vk.svg";
import telegram from "../../../images/main/telegram.svg";
import github from "../../../images/main/github.svg";

const Biography = () => {
  return (
    <section className={style.biography}>
      <div className={style.biography__avatar}>
        <img src={avatar} alt="avatar" />
      </div>

      <div className={style.biography__text__content}>
        <h2 className={style.biography__title}>Biography</h2>
        <p className={style.biography__text}>
          I have been programming since 2020. The first language was{" "}
          <span className="text-light-blue">Python</span>. Soon I began to learn
          frontend (<span className="text-orange">HTML</span>,{" "}
          <span className="text-blue">CSS</span>,{" "}
          <span className="text-yellow">JS</span>), then I became{" "}
          <span className="text-cyan">React</span> and more recently{" "}
          <span className="text-green">Node JS</span>
        </p>
      </div>

      <div className={style.biography__social}>
        <h2 className={style.biography__title}>Let's connect</h2>

        <ul className={style.biography__list}>
          {[
            { title: "vk", icon: vk, link: "https://vk.com/nullbebra" },
            {
              title: "telegram",
              icon: telegram,
              link: "https://t.me/ItsZeroFour",
            },
            {
              title: "github",
              icon: github,
              link: "https://github.com/ItsZeroFour",
            },
          ].map(({ title, icon, link }) => (
            <li className={style.biography__item} key={title}>
              <a href={link} target="_blank" rel="noreferrer">
                <img src={icon} alt={title} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Biography;
