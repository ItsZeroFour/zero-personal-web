import React from "react";
import style from "./Markdown.module.scss";
import ReactMarkdown from "react-markdown";

const Markdown = ({ setText, text }) => {
  return (
    <>
      <div className={style.markdown}>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <div className={style.markdown__output}>
          <ReactMarkdown children={text} />
        </div>
      </div>
    </>
  );
};

export default Markdown;
