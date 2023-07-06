import React from "react";
import style from "./Footer.module.scss";
import { NavLink } from "react-router-dom";
import vk from "../../images/footer/vk.svg";
import telegram from "../../images/footer/telegram.svg";
import github from "../../images/footer/github.svg";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <nav>
        <ul>
          {[
            {
              title: "Starter template",
              link: "https://www.figma.com/file/XEbBXBIY4s241mRzAhIp5N/Portofolio-Website-Template-(Community)?type=design&node-id=813%3A137&mode=design&t=BF08Lw5bjvm5ELlE-1",
            },
            { title: "Contacts", link: "/contacts" },
            { title: "Portfolio", link: "/portfolio" },
          ].map(({ title, link }) => (
            <li key={title}>
              <NavLink to={link}>{title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={style.footer__social}>
        <h5>Reach me out</h5>
        <ul>
          {[
            { title: "vk", image: vk, link: "https://vk.com/nullbebra" },
            {
              title: "telegram",
              image: telegram,
              link: "https://t.me/ItsZeroFour",
            },
            {
              title: "github",
              image: github,
              link: "https://github.com/ItsZeroFour",
            },
          ].map(({ image, link, title }) => (
            <li key={title}>
              <NavLink to={link}>
                <img src={image} alt={title} />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
