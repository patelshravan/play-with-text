import React, { useState } from "react";
import copy from "copy-to-clipboard";

const TextForm = (props) => {
  const [text, setText] = useState("");
  const [copyText, setCopyText] = useState("");

  const textToUpper = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  const textToLower = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  const clearText = () => {
    let newText = "";
    setText(newText);
    if (text.length > 0) {
      props.showAlert("Text Cleared!", "success");
    }
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
    setCopyText(e.target.value);
  };

  const handleExtraSpace = () => {
    let newText = text.split(/[ ] + /);
    setText(newText.join(" "));
    if (text.length > 0) {
      props.showAlert("Removed Extra Spaces!", "success");
    }
  };

  const handleCopySpace = () => {
    copy(copyText);
    if (text.length > 0) {
      props.showAlert("Text Copied!", "success");
    }
  };

  return (
    <>
      <div
        className="container"
        // style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2>{props.heading}</h2>
        <div className="mb-3">
          <textarea
            value={text}
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            onChange={handleOnChange}
            className="form-control"
            id="myBox"
            rows="8"
          ></textarea>
        </div>

        <button onClick={textToUpper} className="btn btn-primary mx-2">
          Convert to Uppercase
        </button>
        <button onClick={textToLower} className="btn btn-primary mx-2">
          Convert to Lowercase
        </button>
        <button onClick={clearText} className="btn btn-primary mx-2">
          Clear Text
        </button>
        <button onClick={handleCopySpace} className="btn btn-primary mx-2">
          Copy Text
        </button>
        <button onClick={handleExtraSpace} className="btn btn-primary mx-2">
          Clear Extra Space
        </button>
      </div>
      <div
        className="container my-3"
        // style={{ color: props.mode === "light" ? "white" : "#042743" }}
      >
        <h2>Your Text Summary</h2>
        <p>
          {text.split(" ").filter((text) => text !== "").length} <b>Words</b>{" "}
          and {text.length} <b>Characters</b>
        </p>
        <p>
          {0.008 * text.split(" ").filter((text) => text !== "").length}{" "}
          <b>Minutes To Read</b>
        </p>
        <h2>Preview</h2>
      </div>
      <div
        // style={{ color: props.mode === "light" ? "white" : "#042743" }}
        className="container my-3"
      >
        {text.length > 0 ? text : "No Text To Display!"}
      </div>
    </>
  );
};

export default TextForm;
