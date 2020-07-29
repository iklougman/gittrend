import React from "react";
import logo from "./logo.svg";
import "./styles/main.scss";
import Gallery from "./containers/Gallery";
import { fetcher } from "./utils";
import { Layout } from "antd";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header className="main-header">
        <img alt="logo" src={logo}></img>
      </Header>
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Gallery fetcher={fetcher} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
