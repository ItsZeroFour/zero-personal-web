import React from "react";
import style from "./Header.module.scss";
import logo from "../../images/header/logo.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={style.header}>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>

      <nav>
        <ul className={style.header__list}>
          {[
            { title: "Home", link: "/" },
            { title: "Blog", link: "/blog" },
            { title: "Portfolio", link: "/portfolio" },
            { title: "Contacts", link: "/contacts" },
            { title: "Account", link: "/account" },
          ].map(({ title, link }) => (
            <li key={title}>
              <NavLink to={link}>{title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
