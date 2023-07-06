import React from "react";
import style from "./Stack.module.scss";
import world from "../../../images/main/world.svg";
import list from "../../../images/main/list.svg";

const Stack = () => {
  return (
    <section className={style.stack}>
      <div className={style.stack__text__content}>
        <h2>What I do</h2>
        <p>
          I can build an application from scratch. I develop both{" "}
          <span className="text-cyan">Frontend</span> and{" "}
          <span className="text-green">Backend</span> using{" "}
          <span className="text-green">Node js</span> and{" "}
          <span className="text-cyan">React</span>!
        </p>
      </div>

      <div className={style.stack__stacks}>
        <div className={style.stack__stack}>
          <div className={style.stack__stack__img}>
            <img src={world} alt="stack icon world" />
          </div>

          <div className={style.stack__stack__info}>
            <div className={style.stack__stack__texts}>
              <h4>Frontend</h4>
              <p>
                I am developing the client side. I make it on React or HTML,
                СSS/Scss
              </p>
            </div>
          </div>
        </div>

        <div className={style.stack__stack}>
          <div className={style.stack__stack__img}>
            <img src={list} alt="stack icon list" />
          </div>

          <div className={style.stack__stack__info}>
            <div className={style.stack__stack__texts}>
              <h4>Backend</h4>
              <p>
                I'm doing the server side with Node js. I use modular type
                import and export
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stack;
