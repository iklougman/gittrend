import React from "react";
import logo from "./logo.svg";
import "./styles/main.scss";
import Gallery from "./containers/Gallery";
import { fetcher } from "./utils";

function App() {
  return (
    <>
      <header className="main-header">
        <img alt="logo" src={logo}></img>
      </header>
      <div className="main-content">
        <Gallery fetcher={fetcher} />
      </div>
    </>
  );
}

export default App;
