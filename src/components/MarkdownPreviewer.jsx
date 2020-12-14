import React, { Component } from "react";
import './MarkdownPreviewer.scss';
import marked from 'marked';


const renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

marked.setOptions({
  breaks: true,
});


const Editor = ({
  value,
  onChange
}) => {
  return (
    <form id='heading'>
      <label>
        Enter your markdown here:
      </label>
      <br />
      <textarea value={value} onChange={onChange} id='editor' />
      <br />
    </form>
  );
};

const Previewer = ({
  marking
}) => {
  return (
    <div>
      <div id='heading'>
        Your markdown will be previewed here:
      </div>
      <br />
      <div id='preview' dangerouslySetInnerHTML={marking} />
    </div>
  );
};

export default class MarkdownApp extends Component {
  constructor(props) {
    super(props);

    const defaultContent =
      `# This is a h1 element!
      ## This is a h2 element!
      \`\`\`
      This is multi-line code
      More multi-line code
      Even more multi-line code!
      \`\`\`
      This is \`inline code\`

      > This is a Blockquote

      * This is a list item
      * This is a second list item
      * We can have as many as we like!

      Have a pretty Northern lights image:

      ![image](https://www.w3schools.com/w3css/img_lights.jpg)

      __We can even apply styles like bold!__

      [This is a link to a Markdown demo](https://marked.js.org/demo/?text=)`

    this.state = {
      value: defaultContent
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div id='container'>
        <Editor
          value={
            this.state.value
          }
          onChange={
            this.handleChange
          }
          id='edit'
        />
        <Previewer marking={{
          __html: marked(
            this.state.value,
            { renderer: renderer }
          )
        }}
          id='previewer'
        />
      </div>
    );
  }
}

// ReactDOM.render(
//   <MarkdownApp />,
//   document.getElementById('root')
// );