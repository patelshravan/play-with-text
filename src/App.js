import "./App.css";
import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";
import React, { useState } from "react";
import Alert from "./Components/Alert";
import About from "./Components/About";
import { Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "gray";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  return (
    <>
      <Navbar
        title={"PlayWithText"}
        about={"About PlayWithText"}
        mode={mode}
        toggleMode={toggleMode}
      />
      <Alert Alert={alert} />
      <div className="container my-3">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <TextForm
                showAlert={showAlert}
                heading={"Enter the text to analyse below"}
              />
            }
          />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
