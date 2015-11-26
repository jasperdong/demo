var TodoList3 = React.createClass({
  displayName: "TodoList3",

  render: function () {
    var _this = this;
    var createItem = function (item, index) {
      return React.createElement(
        "li",
        { key: index, className: "alert alert-success" },
        React.createElement(
          "h3",
          { className: "name label label-info" },
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
      name: ''
    };
  },

  componentDidUpdate: function () {
    document.body.scrollTop = 9999999;
  },
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

  removeItem: function (key) {
    var ref = new Firebase(this.props.fire_url);
    ref.child(key).remove();
  },

  handleSubmit: function (e) {
    e.preventDefault();

    if (!this.state.text || !this.state.name) {
      return false;
    }
    this.firebaseRefs['items'].push({
      name: this.state.name,
      text: this.state.text,
      date: Date.now()
    });
    document.body.scrollTop = 9999999;

    this.setState({
      text: '',
      name: ''
    });
  },

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(TodoList3, { items: this.state.items, removeItem: this.removeItem }),
      React.createElement("hr", null),
      React.createElement(
        "form",
        { className: "form-inline", onSubmit: this.handleSubmit },
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            null,
            "Name : ",
            React.createElement("input", { className: "form-control", onChange: this.onChangeName, value: this.state.name })
          )
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            null,
            "Message : ",
            React.createElement("input", { className: "form-control", onChange: this.onChange, value: this.state.text })
          )
        ),
        React.createElement(
          "button",
          { type: "submit", className: "btn btn-primary" },
          'Add #' + (this.state.items.length + 1)
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(TodoApp3, { fire_url: "https://reactjs-test.firebaseio.com/comments/" }), document.getElementById('content'));