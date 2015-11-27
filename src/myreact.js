
var TodoList3 = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      item.label = item.label || 'info';
      var className = "name label label-" + item.label;
      return (
        <li key={ index } className="alert alert-success">
          <h3 className={className}>{item.name}</h3> say : { item.text }
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
      name:'',
      label:'info',
    };
  },
  
  componentDidUpdate: function() {
    scrollTop();
  },
//   var FirebaseTokenGenerator = require("firebase-token-generator");
// var tokenGenerator = new FirebaseTokenGenerator("<YOUR_FIREBASE_SECRET>");
// var token = tokenGenerator.createToken({uid: "1", some: "arbitrary", data: "here"});
  // componentWillUpdate: function() {
  //   console.log('aa');
  // },

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

  onChangeLabel: function(e){
    this.setState({label:e.target.value});
  },

  removeItem: function(key) {
    var ref = new Firebase(this.props.fire_url);
    ref.child(key).remove();
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var text = this.state.text.trim();
    var name = this.state.name.trim();

    if(!text || !name) {
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

  render: function() {
    var width = {
      w400: {width:'400px'},
      w500: {width:'500px'},
      w100: {width:'100px'}
    };
    return (
      <div>
        <TodoList3 items={ this.state.items } removeItem={ this.removeItem } />
        <hr/>
        <div className="row">
          <form className="form-inline" onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <label>Color : 
                <select className="form-control" onChange={ this.onChangeLabel } value={this.props.selected}>
                  <option value="info">Info</option>
                  <option value="primary">Primary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>Name : <input className="form-control" style={width.w100} onChange={ this.onChangeName } value={ this.state.name } /></label>
            </div>
            <div className="form-group">
              <label>Message : <input className="form-control" style={width.w500} onChange={ this.onChange } value={ this.state.text } /></label>
            </div>
            <button type="submit" className="btn btn-primary">{ 'Add #' + (this.state.items.length + 1) }</button>
          </form>
        </div>
      </div>
    );
  }
});

var scrollTop = function(){
  document.documentElement.scrollTop = 9999999;
  document.body.scrollTop = 9999999;
}

ReactDOM.render(
  <TodoApp3 fire_url="https://reactjs-test.firebaseio.com/comments/" />, 
  document.getElementById('content')
);
