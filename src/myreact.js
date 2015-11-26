var TodoList3 = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <li key={ index } className="alert alert-success">
          <h3 className="name label label-info">{item.name}</h3> say : { item.text }
          <button type="button" className="btn btn-danger btn-xs btn-delete pull-right" onClick={ _this.props.removeItem.bind(null, item['.key']) }>x</button>
        </li>
      );
    };
    return <ul className="list-unstyled">{ this.props.items.map(createItem) }</ul>;
    
  }
});

var TodoApp3 = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      items: [],
      text: '',
      name:''
    };
  },

  componentWillMount: function() {
    var ref = new Firebase(this.props.fire_url);
    this.bindAsArray(ref.limitToLast(50), 'items');
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  onChangeName: function(e) {
    this.setState({name: e.target.value});
  },

  removeItem: function(key) {
    var ref = new Firebase(this.props.fire_url);
    ref.child(key).remove();
  },

  handleSubmit: function(e) {
    e.preventDefault();

    if(!this.state.text ||
    !this.state.name) {
      return false;
    }
    this.firebaseRefs['items'].push({
      name: this.state.name,
      text: this.state.text,
      date: Date.now()
    });
    this.setState({
      text: '', 
      name: ''
    });
  },

  render: function() {
    return (
      <div>
        <TodoList3 items={ this.state.items } removeItem={ this.removeItem } />
        <hr/>
        <form className="form-inline" onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <label>Name : <input className="form-control" onChange={ this.onChangeName } value={ this.state.name } /></label>
          </div>
          <div className="form-group">
            <label>Message : <input className="form-control" onChange={ this.onChange } value={ this.state.text } /></label>
          </div>
          <button type="submit" className="btn btn-primary">{ 'Add #' + (this.state.items.length + 1) }</button>
        </form>
      </div>
    );
  }
});

ReactDOM.render(
  <TodoApp3 fire_url="https://reactjs-test.firebaseio.com/comments/" />, 
  document.getElementById('content')
);
