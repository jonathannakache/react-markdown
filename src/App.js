import React, { Component } from "react";
import { sampleText } from "./sampleText";
import marked from "marked";

class App extends Component {
  state = {
    text: sampleText
  };
  handleChange = event => {
    const text = event.target.value;
    this.setState({ text });
  };

  componentDidMount() {
    const text = localStorage.getItem("text");

    if (text) {
      this.setState({ text });
    } else {
      this.setState({ text: sampleText });
    }
  }

  componentDidUpdate() {
    const { text } = this.state;
    localStorage.setItem("text", text);
  }

  renderText = text => {
    const __html = marked(text, { sanitize: true });
    return { __html };
  };

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-sm-6">
            <textarea
              value={this.state.text}
              onChange={this.handleChange}
              className="form-control"
              rows="35"
            ></textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
