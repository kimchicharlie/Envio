var React = require('react');
var ReactDOM = require('react-dom');
var Cookie = require('react-cookie');
var utils = require('../../utils');

var modalStyles = {overlay: {zIndex: 10}};

UserListItem = React.createClass({
  ModifUser : function (){
    this.props.changeToModif(this.props.user);
  },
  DeleteUser : function (){
    this.props.changeToDelete(this.props.user, this.props.index);
  },
  render: function () {
    return (
      <li className="panel panel-success room-elem">
        <span className="w_20p">Mail :<h3 className="teal">{this.props.user.email}</h3></span>
        <span className="w_20p">Name : <h3 className="blue">{this.props.user.firstname + ' ' + this.props.user.lastname}</h3></span>
        <span className="w_15p">Organisation: <h3 className="purple">{this.props.user.organisation}</h3></span>
        <button className="btn btn-primary list-button w_15p pads" onClick={this.ModifUser}><i className="fa fa-pencil" aria-hidden="true"></i> Modifier</button>
        <button className="btn btn-danger list-button w_15p pads" onClick={this.DeleteUser}><i className="fa fa-ban" aria-hidden="true"></i> Supprimer</button>
      </li>
    );
  }
});

UserList = React.createClass({
  render: function () {
    var react = this;
    var items = this.props.users.map(function (user) {
      return (
        <UserListItem key={user[utils.getIdType()]} user={user} changeToDelete={react.props.changeToDelete} changeToModif={react.props.changeToModif}/>
      );
    });
    return (
      <ul className="users-list">
        {items}
      </ul>
    );
  }
});

ModifUser = React.createClass({
  getInitialState: function() {
      return {
          status: false,
      }
  }, 
  handleSubmit(event) {
    event.preventDefault();
    var email = ReactDOM.findDOMNode(this.refs.email).value;
    var firstname = ReactDOM.findDOMNode(this.refs.firstname).value;
    var lastname = ReactDOM.findDOMNode(this.refs.lastname).value;
    var organisation = ReactDOM.findDOMNode(this.refs.organisation).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    react = this;
    HttpPost('/updateUser', {
      'userId': react.props.Id[utils.getIdType()],
      'email': email,
      'firstname': firstname,
      'lastname': lastname,
      'organisation': organisation,
      'password': password,
    }, function(rep) {
      rep = JSON.parse(rep);
      if(rep.error == null){
        react.setState({status: false});
        react.props.changeToUserList();
      }
      else {
        react.setState({status : rep.error.message || rep.error});
      }             
    });
  },      
  render : function() {
    return (
      <div className="form">
        <form role="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="input-container">
              <input className="input-medium" ref="email" type="text" placeholder={this.props.Id.email}/>
            </div>
            <div className="input-container">
              <input className="input-medium" ref="firstname" type="text" placeholder={this.props.Id.firstname}/>
            </div>
            <div className="input-container">
              <input className="input-medium" ref="lastname" type="text" placeholder={this.props.Id.lastname}/>
            </div>
            <div className="input-container">
              <input className="input-medium" ref="organisation" type="text" placeholder={this.props.Id.organisation}/>
            </div>  
            <div className="input-container">
              <input className="input-medium" ref="password" type="password" placeholder="Password"/>
            </div>             
          </div>
          <button className="button-medium" type="submit">Modifier</button>
        </form>
        <button className="red-b btn button-medium" onClick={this.props.changeToUserList}><i className="fa fa-chevron-left" aria-hidden="true"></i> Retour</button>    
      </div>
    );
  }
});

CreateUser = React.createClass({
  getInitialState: function() {
      return {
          status: false,
      }
  },
  handleSubmit : function(event) {
    event.preventDefault();
    var email = ReactDOM.findDOMNode(this.refs.email).value;
    var firstname = ReactDOM.findDOMNode(this.refs.firstname).value;
    var lastname = ReactDOM.findDOMNode(this.refs.lastname).value;
    var organisation = ReactDOM.findDOMNode(this.refs.organisation).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    react = this;
    HttpPost('/register', {
      'email': email,
      'firstname': firstname,
      'lastname': lastname,
      'organisation': organisation,
      'password': password,
    }, function(rep) {
      rep = JSON.parse(rep);
      if(rep.error == null){
        react.setState({status: false});
        react.props.changeToUserList();
      }
      else {
        react.setState({status : rep.error.message || rep.error});
      }             
    });
  },
  render : function() {   
    return (
      <div className="form">
        <form role="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="input-container">
              <input className="input-medium" ref="email" type="text" placeholder="Email"/>
            </div>
            <div className="input-container">
              <input className="input-medium" ref="firstname" type="text" placeholder="Firstname"/>
            </div>
            <div className="input-container">
              <input className="input-medium" ref="lastname" type="text" placeholder="Lastname"/>
            </div>
            <div className="input-container">
              <input className="input-medium" ref="organisation" type="text" placeholder="Organisation"/>
            </div>  
            <div className="input-container">
              <input className="input-medium" ref="password" type="password" placeholder="Password"/>
            </div>             
          </div>
          <button className="button-medium" type="submit">Créer</button>
        </form>
        <button className="red-b btn button-medium" onClick={this.props.changeToUserList}><i className="fa fa-chevron-left" aria-hidden="true"></i> Retour</button>    
      </div>
    );
  }
});

DeleteUser = React.createClass({
  getInitialState : function() {
    return {
      error : false
    };
  },
  deleteUser : function (){
    var react = this;
    HttpPost('/deleteUser', {
      'userId': react.props.Id[utils.getIdType()],         
    }, function(rep) {
      rep = jQuery.parseJSON(rep);
      if(rep.error == null){
        react.props.changeToUserList();  
      }
      else{
        react.setState({error :  rep.error});
      }             

    }); 
  },
  render: function () {
    return (
      <div className="form">
      <h2 className="label-g">Êtes-vous sûr ?<br></br> </h2>
      <button className="btn button-medium" onClick={this.deleteUser}><i className="fa fa-check" aria-hidden="true"></i> Oui</button>
      <button  className="red-b btn button-medium" onClick={this.props.changeToUserList}><i className="fa fa-ban" aria-hidden="true"></i> Non</button>
      <ErrorMessage content={this.state.error}/>
      </div>
    );
  }
});

Admin = React.createClass({
  getInitialState: function() {
    return {
      userId: Cookie.load('userId'),
      organisation: Cookie.load('organisation'),
      users: [],
      creat :null,
      modif :null,
      delete :null,
      error : false,
    };
  },
  componentWillMount: function() {
    var that = this;
    if (that.state.userId) {
      HttpPost('/getUsersAdmin', {
        'guid': that.state.userId,
      }, function(rep) {
        rep = JSON.parse(rep);
        if (rep.error === null){
          that.setState({users: rep.users});
        }
        else{
          that.setState({error:rep.error});
        }
      });
    }
  },
  changeToCreat: function(){
    this.setState({creat: true});
    this.setState({modif: null});
    this.setState({delete: null});
  },
  changeToModif: function(user){
    this.setState({modif: user});
    this.setState({creat: null});
    this.setState({delete: null});          
  },
  changeToDelete: function(user){
    this.setState({delete: user});
    this.setState({modif: null});
    this.setState({creat: null});          
  }, 
  changeToUserList: function(){
    react = this;
    HttpPost('/getUsersAdmin', {
      'guid': react.state.userId,
    }, function(rep) {
      rep = JSON.parse(rep);
      if (rep.error === null){
        react.setState({modif: null});
        react.setState({delete: null});
        react.setState({creat: null});        
        react.setState({users: rep.users});
      }
      else{
        react.setState({error:  rep.error});
        react.setState({modif: null});
        react.setState({delete: null});
        react.setState({creat: null});
        react.setState({users: []});
      }            
    });          
  },
  render() {
    var cat = <UserList users={this.state.users} changeToDelete={this.changeToDelete} changeToModif={this.changeToModif}/>;
    var creatbutton = <button className="button-medium-cl btn btn-success" onClick={this.changeToCreat}><i className="fa fa-plus-square" aria-hidden="true"></i> Créer Utilisateur</button>;
    if (this.state.creat !== null) 
    {
      cat = <CreateUser Organisation={this.props.Organisation} changeToUserList={this.changeToUserList}/>;
      creatbutton = null;
    }                  
    if(this.state.modif !== null )
    {
      cat = <ModifUser Id={this.state.modif} changeToUserList={this.changeToUserList}/>;
    }
    if(this.state.delete !== null )
    {
      cat = <DeleteUser Id={this.state.delete} changeToUserList={this.changeToUserList}/>;
      creatbutton = null;
    }
    return (
        <div>
          <div className="content">
              {cat}                   
              {creatbutton}
      x    </div>
          <ErrorMessage content={this.state.error}/>
        </div>
    );
  }
});