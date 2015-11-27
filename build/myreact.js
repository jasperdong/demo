
var TodoList3 = React.createClass({
  displayName: "TodoList3",

  render: function () {
    var _this = this;
    var createItem = function (item, index) {
      item.label = item.label || 'info';
      var className = "name label label-" + item.label;
      return React.createElement(
        "li",
        { key: index, className: "alert alert-success" },
        React.createElement(
          "h3",
          { className: className },
          item.name
        ),
        " say : ",
        item.text,
        React.createElement(
          "button",
          { type: "button", className: "btn btn-danger btn-xs btn-delete pull-right", onClick: _this.props.removeItem.bind(null, item['.key']) },
          "x"
        )
      );
    };
    return React.createElement(
      "ul",
      { className: "list-unstyled" },
      this.props.items.map(createItem)
    );
  }
});

var TodoApp3 = React.createClass({
  displayName: "TodoApp3",

  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      items: [],
      text: '',
      name: '',
      label: 'info'
    };
  },

  componentDidUpdate: function () {
    scrollTop();
  },
  //   var FirebaseTokenGenerator = require("firebase-token-generator");
  // var tokenGenerator = new FirebaseTokenGenerator("<YOUR_FIREBASE_SECRET>");
  // var token = tokenGenerator.createToken({uid: "1", some: "arbitrary", data: "here"});
  // componentWillUpdate: function() {
  //   console.log('aa');
  // },

  componentWillMount: function () {
    var ref = new Firebase(this.props.fire_url);
    this.bindAsArray(ref.limitToLast(50), 'items');
  },

  onChange: function (e) {
    this.setState({ text: e.target.value });
  },

  onChangeName: function (e) {
    this.setState({ name: e.target.value });
  },

  onChangeLabel: function (e) {
    this.setState({ label: e.target.value });
  },

  removeItem: function (key) {
    var ref = new Firebase(this.props.fire_url);
    ref.child(key).remove();
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var text = this.state.text.trim();
    var name = this.state.name.trim();

    if (!text || !name) {
      return false;
    }
    this.firebaseRefs['items'].push({
      name: this.state.name,
      text: this.state.text,
      label: this.state.label,
      date: Date.now()
    });

    scrollTop();

    this.setState({
      text: ''
    });
  },

  render: function () {
    var width = {
      w400: { width: '400px' },
      w500: { width: '500px' },
      w100: { width: '100px' }
    };
    return React.createElement(
      "div",
      null,
      React.createElement(TodoList3, { items: this.state.items, removeItem: this.removeItem }),
      React.createElement("hr", null),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "form",
          { className: "form-inline", onSubmit: this.handleSubmit },
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Color :",
              React.createElement(
                "select",
                { className: "form-control", onChange: this.onChangeLabel, value: this.props.selected },
                React.createElement(
                  "option",
                  { value: "info" },
                  "Info"
                ),
                React.createElement(
                  "option",
                  { value: "primary" },
                  "Primary"
                ),
                React.createElement(
                  "option",
                  { value: "success" },
                  "Success"
                ),
                React.createElement(
                  "option",
                  { value: "warning" },
                  "Warning"
                ),
                React.createElement(
                  "option",
                  { value: "danger" },
                  "Danger"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Name : ",
              React.createElement("input", { className: "form-control", style: width.w100, onChange: this.onChangeName, value: this.state.name })
            )
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Message : ",
              React.createElement("input", { className: "form-control", style: width.w500, onChange: this.onChange, value: this.state.text })
            )
          ),
          React.createElement(
            "button",
            { type: "submit", className: "btn btn-primary" },
            'Add #' + (this.state.items.length + 1)
          )
        )
      )
    );
  }
});

var scrollTop = function () {
  document.documentElement.scrollTop = 9999999;
  document.body.scrollTop = 9999999;
};

ReactDOM.render(React.createElement(TodoApp3, { fire_url: "https://reactjs-test.firebaseio.com/comments/" }), document.getElementById('content'));