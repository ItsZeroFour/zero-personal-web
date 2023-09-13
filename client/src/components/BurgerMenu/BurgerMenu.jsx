import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/header/logo.svg";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="burgerMenu">
      <div
        className={!open ? "burgerMenu__menu" : "burgerMenu__menu open"}
        onClick={() => setOpen(!open)}
      >
        <div className="burgerMenu__menu__burger" />
      </div>

      {open && (
        <div className="burgerMenu__openMenu">
          <img src={logo} alt="logo" />

          <ul className="burgerMenu__list">
            {[
              { title: "Home", link: "/" },
              { title: "Blog", link: "/blog" },
              { title: "Portfolio", link: "/portfolio" },
              { title: "Reviews", link: "/reviews" },
              { title: "Contacts", link: "/contacts" },
              { title: "Account", link: "/account" },
            ].map(({ title, link }) => (
              <li key={title} onClick={() => setOpen(false)}>
                <NavLink to={link}>{title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default BurgerMenu;
