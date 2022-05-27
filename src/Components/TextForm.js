import React, { useState } from "react";
import { split } from "sentence-splitter";
import Chip from "@material-ui/core/Chip";
import { flesch } from "flesch";

const TextForm = (props) => {
  const [text, setText] = useState("");
  const [processedText, setProcessedText] = useState("");

  const getSentences = () => {
    let splittedText = split(text);
    let tempProcessedText = "";
    for (let i = 0; i < splittedText.length; i++) {
      let splitObject = splittedText[i];
      if (splitObject.type === "Sentence") {
        tempProcessedText = tempProcessedText + "\n" + splitObject.raw;
      }
    }

    setProcessedText(tempProcessedText.trim());
  };

  const getSentenceCount = (text) => {
    let splittedText = split(text);
    let count = 0;
    for (let i = 0; i < splittedText.length; i++) {
      let splitObject = splittedText[i];
      if (splitObject.type === "Sentence") {
        count += 1;
      }
    }
    return count;
  };

  var countSyllables = function (text) {
    text = text.toLowerCase();
    text = text.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, "");
    text = text.replace(/^y/, "");

    var syl = text.match(/[aeiouy]{1,2}/g);

    if (syl) {
      return syl.length;
    } else {
      return 0;
    }
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
  };
  const handleOnChange2 = (e) => {
    setProcessedText(text);
  };

  const textToUpper = () => {
    let newText = text.toUpperCase();
    setProcessedText(newText);
  };

  const textToLower = () => {
    let newText = text.toLowerCase();
    setProcessedText(newText);
  };

  const clearTextArea1 = () => {
    let newText = "";
    setText(newText);
  };
  const clearTextArea2 = () => {
    let newText = "";
    setProcessedText(newText);
    if (processedText.length > 0) {
      props.showAlert("Text Cleared!", "success");
    }
  };

  const handleExtraSpaceFirst = () => {
    let newText = text.split(/[ ] + /);
    setText(newText.join(" "));
    if (processedText.length > 0) {
      props.showAlert("Removed Extra Spaces!", "success");
    }
  };

  const handleExtraSpaceSecond = () => {
    let newText = text.split(/[ ] + /);
    setProcessedText(newText.join(" "));
    if (processedText.length > 0) {
      props.showAlert("Removed Extra Spaces!", "success");
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(processedText);
    if (processedText.length > 0) {
      props.showAlert("Copied to Clipboard!", "success");
    }
  };

  const wordCountFirst = text.split(" ").filter((text) => text !== "").length;

  const wordCountSecond = processedText
    .split(" ")
    .filter((processedText) => processedText !== "").length;

  const minutesReadFirst =
    0.008 * text.split(" ").filter((text) => text !== "").length;

  const minutesReadSecond =
    0.008 *
    processedText.split(" ").filter((processedText) => processedText !== "")
      .length;

  const getGrade = (
    flesch({
      sentence: getSentenceCount(processedText),
      word: wordCountSecond,
      syllable: countSyllables(processedText),
    }) / 10
  ).toFixed(2);

  return (
    <div className="container">
      <div style={{ textAlign: "end" }}>
        <button
          style={{ marginBottom: "4px" }}
          onClick={handleExtraSpaceFirst}
          className="btn btn-outline-success mx-2"
        >
          Clear Extra Spaces
        </button>
        <span
          style={{ cursor: "pointer" }}
          className="material-symbols-outlined"
          onClick={clearTextArea1}
        >
          delete
        </span>
      </div>
      <div className="form-floating">
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          style={{ height: "200px", border: "solid 1px" }}
        ></textarea>
        <label htmlFor="floatingTextarea2">{props.heading}</label>
      </div>
      <div className=" my-3">
        {/* <h2>Your Text Summary</h2> */}
        <span>
          {" "}
          <Chip
            label={`${wordCountFirst}${" "}Words`}
            variant="outlined"
          />{" "}
          <Chip label={`${text.length} Characters`} variant="outlined" />{" "}
          <Chip
            label={`${minutesReadFirst} Minutes To Read`}
            variant="outlined"
          />{" "}
        </span>
      </div>
      <div className="mt-5">
        <div style={{ textAlign: "center" }}>
          <button
            onClick={textToUpper}
            className="btn btn-outline-success mx-2"
          >
            Convert to Uppercase
          </button>
          <button
            onClick={textToLower}
            className="btn btn-outline-success mx-2"
          >
            Convert to Lowercase
          </button>
          <button
            onClick={handleExtraSpaceSecond}
            className="btn btn-outline-success mx-2"
          >
            Clear Extra Spaces
          </button>
          <button
            onClick={getSentences}
            className="btn btn-outline-success mx-2"
          >
            Split into Sentences
          </button>
        </div>
        <div style={{ textAlign: "end" }}>
          <span
            style={{ cursor: "pointer" }}
            className="material-symbols-outlined"
            onClick={clearTextArea2}
          >
            delete
          </span>
          <span
            style={{ cursor: "pointer", marginLeft: "5px" }}
            className="material-symbols-outlined"
            onClick={handleCopyText}
          >
            content_copy
          </span>
        </div>
        <textarea
          className="form-control input-field"
          value={processedText}
          aria-label="readonly input example"
          onChange={handleOnChange2}
          style={{ height: "200px", border: "solid 1px" }}
        ></textarea>
      </div>
      <div className=" my-3">
        {/* <h2>Your Text Summary</h2> */}
        <span>
          {" "}
          <Chip
            label={`${wordCountSecond}${" "}Words`}
            variant="outlined"
          />{" "}
          <Chip
            label={`${processedText.length} Characters`}
            variant="outlined"
          />{" "}
          <Chip
            label={`${minutesReadSecond} Minutes To Read`}
            variant="outlined"
          />{" "}
        </span>

        <Chip label={`${getGrade} Readibility Grade`} variant="outlined" />
      </div>
    </div>
  );
};

export default TextForm;
