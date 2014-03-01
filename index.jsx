/**
 * @jsx React.DOM
 */


// https://github.com/shaunxcode/jsedn
// [:vsplit [:hsplit [:url "http://google.com" :profile "A"] :empty] :empty]

var layout = [
  "vsplit",
    ["hsplit",
      { url: "http://google.com", profile: "A" },
      "empty"],
    "empty"
];

// <div class="box vsplit">
//   <div class="box hsplit">
//     <div class="box browser">Profile A on http://google.com</div>
//     <div class="box empty"></div>
//   </div>
//   <div class="box empty"></div>
// </div>

var Box = React.createClass({
  render: function() {
    var layout = this.props.layout;

    if (layout === "empty") {
      return (
        <div className="box empty">
          <div className="content">
            EMPTY
          </div>
        </div>
      );
    } else if (layout[0] === "hsplit") {
      return (
        <div className="box hsplit">
          <Box layout={layout[1]} />
          <Box layout={layout[2]} />
        </div>
      );
    } else if (layout[0] === "vsplit") {
      return (
        <div className="box vsplit">
          <Box layout={layout[1]} />
          <Box layout={layout[2]} />
        </div>
      );
    } else {
      return (
        <div className="box browser">
          <div className="content">
            <p>Profile {layout.profile}</p>
            <p>{layout.url}</p>
          </div>
        </div>
      );
    }
  }
});

var Splitter = React.createClass({
  getInitialState: function() {
    return { layout: this.props.layout };
  },

  render: function() {
    return (
      <div className="splitter">
        <Box layout={this.state.layout} />
      </div>
    );
  }
});

React.renderComponent(
  <Splitter layout={layout} />,
  document.getElementById('content')
);

