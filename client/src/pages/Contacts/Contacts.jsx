import React, { useRef } from "react";
import style from "./Contacts.module.scss";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import vk from "../../images/main/vk.svg";
import telegram from "../../images/main/telegram.svg";
import github from "../../images/main/github.svg";

const Contacts = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        "Bte1EjapjDkuVt8Kb"
      )
      .then(
        () => {
          toast("Your email has been sent successfully");
        },
        (error) => {
          toast("An error occurred, the email was not sent");
          console.log(error.text);
        }
      );
  };

  return (
    <main className={style.conatcts}>
      <h2>
        Contacts <FontAwesomeIcon icon={faAddressCard} />
      </h2>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="fullName" placeholder="Your full name" />
        <input type="email" name="email" placeholder="Your email" />
        <textarea name="message" placeholder="Your message" />
        <button type="submit">
          Submit <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>

      <section className={style.conatcts__socials}>
        <ul className={style.conatcts__socials__list}>
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
            <li className={style.conatcts__socials__item} key={title}>
              <a href={link} target="_blank" rel="noreferrer">
                <img src={icon} alt={title} />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Contacts;
