import React from "react";
import { useState } from "react";

function Admin() {
  const [abc, setAbc] = useState("");
  setAbc("hello");
  return <h1>Hello</h1>;
}

class Admin extends React.Component {
  render() {
    this.state = { abc: "" };
    this.setState({ abc: "hello" });
    return <h1>Hello</h1>;
  }
}
